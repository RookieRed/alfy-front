import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { SigninComponent } from "./pages/signin/signin.component";
import { SignupComponent } from "./pages/signup/signup.component";
import {AuthGuard} from "./shared/auth.guard";
import {Page404Component} from "./shared/page404/page404.component";
import {HomeComponent} from "./shared/home/home.component";

const routes: Routes = [
  { path: 'signin', component: SigninComponent, canActivate: [AuthGuard] },
  { path: 'signup', component: SignupComponent, canActivate: [AuthGuard] },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },

  { path: '404', component: Page404Component},
  { path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
