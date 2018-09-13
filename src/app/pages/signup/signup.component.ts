import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../models/user";
import {AccountService} from "../../services/account.service";
import {Router} from "@angular/router";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ]
})
export class SignupComponent implements OnInit, OnDestroy {

  form: FormGroup;
  calendarStartDate: Date;
  error: string;
  user: User;
  loading: boolean;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    private adapter: DateAdapter<any>
  ) {
    this.user = new User();
    this.form = this.fb.group({
      username: [this.user.username, Validators.compose([Validators.required, Validators.minLength(3)])],
      firstName: [this.user.firstName, Validators.compose([Validators.required])],
      lastName: [this.user.lastName, Validators.compose([Validators.required])],
      email: [this.user.email, Validators.compose([Validators.required, Validators.email])],
      birthDay: [this.user.birthDay, Validators.compose([Validators.required])],
      password: [this.user.password, Validators.compose([Validators.required, Validators.minLength(6)])],
      passwordConfirm: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
    });
    this.adapter.setLocale('fr-FR');
    this.calendarStartDate = new Date('2000-01-01');
    this.loading = false;
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

      this.accountService.signup(this.user)
        .then(apiResponse => {
          this.loading = true;
          this.accountService.setSession(apiResponse.token);
          this.router.navigate(['/profile/edit']);
        }, err => {
          this.loading = true;
          this.error = "Erreur : " + err.toString();
          console.error(err);
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
