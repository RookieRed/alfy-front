import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AccountService} from "../../services/account.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit, OnDestroy {

  error: string;
  form: FormGroup;
  canSubmit: boolean;
  loading: boolean;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router
  ) {
    this.error = null;
    this.canSubmit = false;
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.loading = false;
  }

  public submitForm() {
    if (!this.form.valid) {
      this.error = "Vueillez remplir tous les champs";
      return;
    }

    let formVal = this.form.value;
    this.loading = true;
    this.accountService.checkCredentials(formVal.username, formVal.password)
      .then(apiToken => {
        this.loading = false;
        this.accountService.setSession(apiToken.token);
        this.router.navigate(['']);
      }, err => {
        this.loading = false;
        if (err.status == 401) {
          this.error = "Mauvais identifiants";
        } else {
          this.error = "Erreur système";
        }
        console.error(err);
      });
  }

  checkValidity() {
    if (this.form.valid) {
      this.error = null;
    } else {
      this.error = 'Veuillez remplir tous les champs';
    }
  }

  ngOnInit() {
    document.body.style.background = "url('../../../assets/img/connection-background.jpg') no-repeat 0 0";
    document.body.style.backgroundSize = "auto";
  }

  ngOnDestroy() {
    document.body.style.backgroundSize = "";
    document.body.style.background = "";
  }

}
