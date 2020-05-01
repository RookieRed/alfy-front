import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../models/user";
import {AccountService} from "../../services/account.service";
import {environment} from "../../../environments/environment";
import {Address} from "../../models/address";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from "@angular/material-moment-adapter";
import {MatDialog} from "@angular/material";
import {SimpleDialogComponent} from "../../shared/dialogs/simple-dialog/simple-dialog.component";
import {HttpErrorResponse} from "../../../../node_modules/@angular/common/http";

@Component({
  selector: 'app-account',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'fr-Fr'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ]
})
export class ProfileEditComponent implements OnInit {

  form: FormGroup;
  addressForm: FormGroup;
  securityForm: FormGroup;
  error: string;
  loading: boolean;
  pictureLoading: boolean;
  uploadedPicture: File;
  pictureSrc: string;
  pictureIsWide: boolean;
  profileError: string;
  passwordError: string;
  pathCoverPicture: string;

  private passwordOK: boolean;
  private oldUser: User;
  private userAddress: Address;

  private static readonly DEFAULT_PICTURE_SRC: string = '/assets/img/default-avatar.png';

  /*----------------------------
   *  INIT
   -----------------------------*/

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
    this.passwordOK = false;
    this.error = null;
    this.passwordError = null;
    this.profileError = null;
    this.adapter.setLocale('fr-FR');
  }

  async ngOnInit() {
    try {
      this.oldUser = await (this.accountService.getMine());
      this.loading = false;
      this.pathCoverPicture = environment.apiURL + this.oldUser.coverPicture.fullPath;

    } catch (e) {
      this.form = null;
      this.error = e.toString();
      this.loading = false;
      this.pictureLoading = false;
      return;
    }

    this.userAddress = new Address(this.oldUser.address);
    this.initAddressForm();
    this.initSecurityForm();

    this.form = this.fb.group({
      lastName: [this.oldUser.lastName, Validators.required],
      firstName: [this.oldUser.firstName, Validators.required],
      username: [this.oldUser.username, Validators.required],
      birthDay: [this.oldUser.birthDay, Validators.required],
      phone: [this.oldUser.phone],
      email: [this.oldUser.email],
      //address: this.addressForm,
      security: this.securityForm,
      facebook: [this.oldUser.facebook],
      instagram: [this.oldUser.instagram],
      twitter: [this.oldUser.twitter],
      linkedIn: [this.oldUser.linkedIn],
      baccalaureate: [this.oldUser.baccalaureate],
      jobTitle: [this.oldUser.jobTitle],
      address: [this.oldUser.address],
    });

    this.pictureSrc = this.getInitialPictureSrc();
    this.setLoadingPicture();
  }

  private resetForm() {
    this.form.reset();
    this.form.get('lastName').setValue(this.oldUser.lastName);
    this.form.get('firstName').setValue(this.oldUser.firstName);
    this.form.get('username').setValue(this.oldUser.username);
    this.form.get('birthDay').setValue(this.oldUser.birthDay);
    this.form.get('phone').setValue(this.oldUser.phone);
    this.form.get('email').setValue(this.oldUser.email);
    this.form.get('facebook').setValue(this.oldUser.facebook);
    this.form.get('instagram').setValue(this.oldUser.instagram);
    this.form.get('twitter').setValue(this.oldUser.twitter);
    this.form.get('linkedIn').setValue(this.oldUser.linkedIn);
    this.form.get('jobTitle').setValue(this.oldUser.jobTitle);
    this.form.get('baccalaureate').setValue(this.oldUser.baccalaureate);
    this.form.get('address').setValue(this.oldUser.address);

    if (this.oldUser.address != null) {
      this.addressForm.get('line1').setValue(this.oldUser.address.line1);
      this.addressForm.get('region').setValue(this.oldUser.address.region);
      this.addressForm.get('city').setValue(this.oldUser.address.city);
      this.addressForm.get('countryId').setValue(this.oldUser.address.country == null ? null : this.oldUser.address.country.id);
    }
  }

  /*----------------------------
   *  Form submission
   -----------------------------*/

  onFormSubmit() {
    if (this.form.valid) {
      const userBean = new User(Object.assign({}, this.form.value));

      // Password check
      if (this.passwordOK && this.securityForm.value.newPassword != null && this.securityForm.value.newPassword != ''
        && this.securityForm.value.newPassword == this.securityForm.value.passwordConfirm) {
        userBean.password = this.securityForm.value.newPassword;
      } else {
        delete userBean.password;
      }

      // Address check
      if (this.userAddress == null) {
        userBean.address = null;
      } else {
        userBean.address = this.userAddress;
      }

      // Social check


      // Send form to API
      this.accountService.update(userBean)
        .then((newUser) => {
          this.oldUser = newUser;
          this.dialog.open(SimpleDialogComponent, {
            width: '400px',
            data: {
              title: 'Modifiactions enregistrées',
              message: 'Modifiactions enregistrées',
            }
          });
          this.resetForm();
        }, err => {
          console.error(err);
          this.dialog.open(SimpleDialogComponent, {
            width: '400px',
            data: {
              title: 'Erreur à l\'enregistrement',
              message: 'Une erreur est survenue lors de la modification de votre profil, ' +
                'aucune modification n\'a été apportée.',
              type: 'error',
            }
          });
          this.resetForm();
        });
    }
  }

  checkUsername() {
    const input = this.form.value.username;
    if (input !== this.oldUser.username && input.length > 0) {
      const loginTaken = 'Le login est déjà pris, séléctionnez en un autre';
      const serverError = 'Erreur serveur, le login n\'a pas pu être vérifié';
      this.accountService.isUsernameTaken(input)
        .then(() => {
          this.form.get('username').setErrors(null);
          if (this.profileError == loginTaken || this.profileError == serverError) {
            this.profileError = null;
          }
        }, (httpError: HttpErrorResponse) => {
          this.form.get('username').setErrors({taken: true});
          if (httpError.status === 409) {
            this.profileError = loginTaken;
          } else {
            this.profileError = serverError;
          }
        });
    }
  }

  /*----------------------------
   *  Profile picture
   -----------------------------*/

  choseAPicture() {
    document.getElementById('photoPicker').click();
  }

  onImageChange(e) {
    if (e.target.files.length > 0) {
      this.setLoadingPicture();
      this.uploadedPicture = e.target.files[0];
      const fr = new FileReader();
      fr.onload = () => {
        this.pictureSrc = fr.result.toString();
      };
      fr.readAsDataURL(this.uploadedPicture);
    }
  }

  uploadPicture() {
    this.setLoadingPicture();
    this.accountService.updateProfilePicture(this.uploadedPicture)
      .then(newImage => {
          this.uploadedPicture = null;
          this.oldUser.profilePicture = (<any>newImage);
          this.pictureSrc = this.getInitialPictureSrc();
          this.dialog.open(SimpleDialogComponent, {
            width: '400px',
            data: {
              title: 'Photo de profil enregistrée',
              message: 'Votre photo de profil a bien été enregistrée'
            }
          });
        },
        err => {
          this.dialog.open(SimpleDialogComponent, {
            width: '400px',
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

  private getInitialPictureSrc() {
    if (this.oldUser.profilePicture != null) {
      return environment.apiURL + '/' + this.oldUser.profilePicture.path + this.oldUser.profilePicture.name;
    }
    return ProfileEditComponent.DEFAULT_PICTURE_SRC;
  }

  private setLoadingPicture() {
    this.pictureLoading = true;
    const pictureElem = <HTMLImageElement>document.getElementById('profile-picture');
    if (pictureElem != null) {
      pictureElem.onload = () => {
        this.pictureIsWide = pictureElem.naturalWidth / pictureElem.naturalHeight < 1;
        this.pictureLoading = false;
      };
    } else {
      this.pictureLoading = false;
    }
  }

  /*---------------------------
  * Address form
  ---------------------------*/

  onAddressChanged(newAddress: Address) {
    this.userAddress = Object.assign({}, newAddress);
    if ((this.userAddress.line1 != null && this.userAddress.line1.length)
      || (this.userAddress.region != null && this.userAddress.region.length)
      || (this.userAddress.city != null && this.userAddress.city.length)
      || this.userAddress.country != null) {
      if (this.userAddress.line1 == null || this.userAddress.line1.length == 0) {
        this.addressForm.controls.line1.setErrors({invalid: true});
        this.profileError = "Ligne 1 de l'adrese erronnée";
      } else {
        this.addressForm.controls.line1.setErrors(null);
        this.profileError = null;
      }
      if (this.userAddress.city == null || this.userAddress.city.length == 0) {
        this.addressForm.controls.city.setErrors({invalid: true});
        this.profileError = "Veuillez renseigner le champs ville";
      } else {
        this.addressForm.controls.city.setErrors(null);
        this.profileError = null;
      }
      if (this.userAddress.country == null) {
        this.addressForm.controls.countryId.setErrors({invalid: true});
        this.profileError = "Le pays saisi n'est 'pas valide";
      } else {
        this.addressForm.controls.countryId.setErrors(null);
        this.profileError = null;
      }
    } else {
      this.addressForm.controls.line1.setErrors(null);
      this.addressForm.controls.city.setErrors(null);
      this.addressForm.controls.countryId.setErrors(null);
      this.profileError = null;
      this.userAddress = null;
    }
    this.addressForm.updateValueAndValidity();
  }

  private initAddressForm() {
    this.addressForm = this.fb.group({
      line1: [this.userAddress.line1],
      region: [this.userAddress.region],
      city: [this.userAddress.city],
      countryId: [(this.userAddress.country != null ? this.userAddress.country.id : null)],
    });
  }

  /*---------------------------
  * Security
  ---------------------------*/

  checkCurrentPassword() {
    const password = this.securityForm.value.password;
    if (password != '') {
      this.accountService.checkCredentials(this.oldUser.username, password)
        .then(resp => {
            this.passwordError = null;
            this.securityForm.controls.password.setErrors(null);
            this.passwordOK = true;
          },
          err => {
            this.passwordError = "Mot de passe erroné";
            this.securityForm.controls.password.setErrors({invalid: true});
            this.passwordOK = false;
          });
    }
  }

  onNewPasswordsChanges() {
    const password = this.securityForm.value.password;
    const newPassword = this.securityForm.value.newPassword;
    const passwordConfirm = this.securityForm.value.passwordConfirm;
    if (password == '' || !this.passwordOK && (newPassword != '' || passwordConfirm != '')) {
      this.passwordError = "Veuillez renseinger votre mot de passe actuel";
      this.securityForm.controls.password.setErrors({invalid: true});
    } else if (password == '' && newPassword == '' && passwordConfirm == '') {
      this.passwordError = null;
    } else if (this.passwordOK) {
      if (newPassword != passwordConfirm) {
        this.passwordError = "Les deux mots de passes sont différents";
      } else {
        this.passwordError = null;
      }
    } else {
      this.passwordError = null;
    }
  }

  private initSecurityForm() {
    this.securityForm = this.fb.group({
      password: [''],
      newPassword: [''],
      passwordConfirm: [''],
    });
  }
}
