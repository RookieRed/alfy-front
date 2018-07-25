import {Component, OnInit, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../models/user";
import {AccountService} from "../../services/account.service";
import {environment} from "../../../environments/environment";
import {Address} from "../../models/address";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from "@angular/material-moment-adapter";
import {MatDialog} from "@angular/material";
import {SimpleDialogComponent} from "../../shared/dialogs/simple-dialog/simple-dialog.component";

@Component({
  selector: 'app-account',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ]
})
export class ProfileEditComponent implements OnInit {

  form: FormGroup;
  addressForm: FormGroup;
  securityForm: FormGroup;
  user: User;
  error: string;
  loading: boolean;
  pictureLoading: boolean;
  uploadedPicture: File;
  pictureSrc: string;
  pictureIsWide: boolean;

  private static readonly DEFAULT_PICTURE_SRC: string = '/assets/img/default-avatar.png';

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private adapter: DateAdapter<any>,
    private dialog: MatDialog,
  ) {
    this.loading = true;
    this.pictureLoading = true;
    this.uploadedPicture = null;
    this.pictureIsWide = false;
    this.adapter.setLocale('fr-FR');
  }

  onSubmitInfo() {

  }

  onFileUpload() {

  }

  onUsernameChange() {

  }

  choseAPicture() {
    document.getElementById('photoPicker').click();
  }

  onImageChange(e) {
      if (e.target.files.length > 0) {
        this.setLoadingPicture();
        this.uploadedPicture = e.target.files[0];
        const fr = new FileReader();
        fr.onload = () => {
          this.pictureSrc = fr.result;
        };
        fr.readAsDataURL(this.uploadedPicture);
      }
  }

  uploadPicture() {
    this.setLoadingPicture();
    this.accountService.updateProfilePicture(this.uploadedPicture)
      .then( newImage => {
          this.uploadedPicture = null;
          this.user.profilePicture = (<any>newImage);
          this.pictureSrc = this.getInitialPictureSrc();
          this.dialog.open(SimpleDialogComponent, {
            width: '300px',
            data: {
              title: 'Photo de profil enregistrée',
              message: 'Votre photo de profil a bien été enregistrée'
            }
          });
        },
        err => {
          this.dialog.open(SimpleDialogComponent, {
            width: '300px',
            data: {
              title: 'Erreur lors de l\'enregistrement',
              message: 'Une erreur est survenue lors de l\'enregistrement de votre photo.',
              type: 'error',
            }
          }).afterClosed().subscribe(() => {
            this.resetPicture();
          });
      });
  }

  resetPicture() {
    this.uploadedPicture = null;
    this.pictureSrc = this.getInitialPictureSrc();
    this.setLoadingPicture();
  }

  onAddressChanged(newAdress: Address) {
    console.log(newAdress);
    console.log(this.addressForm);
  }

  async ngOnInit() {
    try {
      this.user = await (this.accountService.getMine());
      this.loading = false;
    }
    catch (e) {
      this.form = null;
      this.error = e.toString();
      this.loading = false;
      this.pictureLoading = false;
      return;
    }

    if (this.user.address == null) {
      this.user.address = new Address();
    }
    this.addressForm = this.fb.group({
      line1: [this.user.address.line1, Validators.required],
      line2: [this.user.address.line2],
      city: [this.user.address.city, Validators.required],
      countryId: [(this.user.address.country != null ? this.user.address.country.id : ''), Validators.required],
    });

    this.securityForm = this.fb.group({
      password: [''],
      newPassword: [''],
      passwordConfirm: [''],
    });

    this.form = this.fb.group({
      lastName: [this.user.lastName, Validators.required],
      firstName: [this.user.firstName, Validators.required],
      username: [this.user.username, Validators.required],
      birthDay: [this.user.birthDay, Validators.required],
      phone: [this.user.phone],
      address: this.addressForm,
      security: this.securityForm,
      facebook: [this.user.facebook],
      twitter: [this.user.twitter],
      linkedIn: [this.user.linkedIn],
    });

    this.pictureSrc = this.getInitialPictureSrc();
    this.setLoadingPicture();
  }

  private getInitialPictureSrc() {
    if (this.user.profilePicture != null) {
      return environment.apiURL + '/' + this.user.profilePicture.path + this.user.profilePicture.name;
    }
    return ProfileEditComponent.DEFAULT_PICTURE_SRC;
  }

  private setLoadingPicture() {
    this.pictureLoading = true;
    let pictureElem = <HTMLImageElement> document.getElementById('profile-picture');
    if (pictureElem != null) {
      pictureElem.onload = () => {
        this.pictureIsWide = pictureElem.naturalWidth / pictureElem.naturalHeight < 1;
        this.pictureLoading = false;
      };
    } else  {
      this.pictureLoading = false;
    }
  }
}
