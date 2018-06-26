import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import {SigninComponent} from "./pages/signin/signin.component";
import {SignupComponent} from "./pages/signup/signup.component";

@NgModule({
  imports: [
    RouterModule.forRoot(this.routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {

  private routes: Routes = [
    { path: '/signin', component: SigninComponent },
    { path: '/signup', component: SignupComponent },
  ];

}
