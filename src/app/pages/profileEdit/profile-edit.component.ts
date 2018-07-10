import {Component, OnInit, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../models/user";
import {AccountService} from "../../services/account.service";
import {environment} from "../../../environments/environment";
import {Address} from "../../models/address";

@Component({
  selector: 'app-account',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {

  form: FormGroup;
  addressForm: FormGroup;
  securityForm: FormGroup;
  user: User;
  error: string;
  loading: boolean;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
  ) {
    this.loading = true;
  }

  onSubmitInfo() {

  }

  onSubmitSecurity() {

  }

  onFileUpload() {

  }

  onUsernameChange() {

  }

  pickAPhoto() {
    document.getElementById('photoPicker').click();
  }

  onAddressChanged(newAdress: Address) {
    console.log(newAdress);
    console.log(this.addressForm);
  }

  getProfilePictureUrl() {
    return environment.apiURL + this.user.profilePicture.pathname;
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
  }
}
