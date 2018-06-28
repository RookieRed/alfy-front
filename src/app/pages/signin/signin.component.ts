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

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService
  ) {
    this.error = null;
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {

  }

  public submitForm() {
    let formVal = this.form.value;
    this.accountService.checkCredentials(formVal.username, this.form.value.password)
      .then(apiToken => {
        console.log(apiToken);
        /*const user = new User();
        user.username = formVal;
        this.accountService.setSession(user)*/
      }, err => {
        console.log(err);
      });
  }

}
