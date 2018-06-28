import {Component, NgModule, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AccountService } from "../../services/account.service";
import { User } from "../../models/user";
import { MatCardTitle } from "@angular/material";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  private error: string;
  private form: FormGroup;
  private canSubmit: boolean;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService
  ) {
    this.error = null;
    this.canSubmit = false;
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
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
      }, err => {
        console.log(err);
      });
  }

  ngOnInit() {
    this.form.valid;
  }

}
