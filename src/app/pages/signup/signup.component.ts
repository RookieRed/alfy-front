import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../models/user";
import {AccountService} from "../../services/account.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {

  form: FormGroup;
  calendarStartDate: Date;
  error: string;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    ) {
    this.form = this.fb.group({
      username: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      firstName: ['', Validators.compose([Validators.required])],
      lastName: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      birthDay: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      passwordConfirm: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
    });
    this.calendarStartDate = new Date('2000-01-01');
  }

  public submitForm() {
    if (this.form.valid) {
      const val = this.form.value;

      if (val.password !== val.passwordConfirm) {
        this.error = "Les deux mots de passes ne sont pas identiques";
        return;
      }
      if (val.birthDay.getTime() >= (new Date()).getTime()) {
        this.error = "Date de naissance invalide";
        return;
      }

      let userPayload = new User();
      userPayload.username = val.username;
      userPayload.firstName = val.firstName;
      userPayload.lastName = val.lastName;
      userPayload.email = val.email;
      userPayload.birthDay = val.birthDay;
      userPayload.password = val.password;

      this.accountService.signup(userPayload)
        .then(apiResponse => {
          this.accountService.setSession(apiResponse.token);
          this.router.navigate(['']);
        }, err => {
          console.log(err);
        });
    }
  }

  public checkValidity() {
    if (!this.form.valid) {
      this.error = 'Le formulaire n\'est pas valide';
    } else {
      this.error = null;
    }
  }

  ngOnInit() {
    document.body.style.background = "url('../../../assets/img/connection-background.jpg') no-repeat 0 0";
    document.body.style.backgroundSize = "100%";
  }

  ngOnDestroy() {
    document.body.style.backgroundSize = "";
    document.body.style.background = "";
  }
}
