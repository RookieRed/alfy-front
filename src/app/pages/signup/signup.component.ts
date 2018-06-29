import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['../signin/signin.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {

  private form: FormGroup;
  private calendarStartDate: Date;
  private error: string;

  constructor(
    private fb: FormBuilder,
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
  }

  ngOnDestroy() {
    document.body.style.background = "";
  }
}
