import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SignupComponent } from './pages/signup/signup.component';
import { SigninComponent } from './pages/signin/signin.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCommonModule, MatGridListModule,
  MatInputModule
} from "@angular/material";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { AuthInterceptorService } from "./services/auth-interceptor.service";

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatCommonModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatButtonToggleModule,
    MatInputModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
