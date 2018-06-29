import {Component, NgModule, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import { AccountService } from "../../services/account.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit, OnDestroy {

  private error: string;
  private form: FormGroup;
  private canSubmit: boolean;

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
  }

  public submitForm() {
    if (!this.form.valid) {
      this.error = "Vueillez remplir tous les champs";
      return;
    }

    let formVal = this.form.value;
    this.accountService.checkCredentials(formVal.username, formVal.password)
      .then(apiToken => {
        this.accountService.setSession(apiToken.token);
        this.router.navigate(['']);
      }, err => {
        console.log(err);
      });
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
