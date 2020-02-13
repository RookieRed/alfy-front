import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';
import {AuthGuard} from './shared/auth.guard';
import {Page404Component} from './pages/page404/page404.component';
import {HomeComponent} from './shared/home/home.component';
import {AboutComponent} from './pages/about/about.component';
import {DirectoryComponent} from './pages/directory/directory.component';
import {ProfileEditComponent} from './pages/profileEdit/profile-edit.component';
import {SignoutComponent} from './pages/signout/signout.component';
import {PageIsBuildingComponent} from './pages/page-is-building/page-is-building.component';
import {FaqComponent} from './pages/faq/faq.component';
import {HighSchoolComponent} from './pages/high-school/high-school.component';
import {AssociationComponent} from './pages/association/association.component';

const routes: Routes = [
  { path: 'signup', component: SignupComponent, canActivate: [AuthGuard] },
  { path: 'signin', component: SigninComponent, canActivate: [AuthGuard] },
  { path: 'signout', component: SignoutComponent, canActivate: [AuthGuard] },
  { path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'about', pathMatch: 'full' },
      { component: AboutComponent, path: 'about' },
      { component: FaqComponent, path: 'faq' },
      { component: DirectoryComponent, path: 'directory' },
      { component: ProfileEditComponent, path: 'profile/:id' },
      { path: 'high-school', redirectTo: 'is-building', pathMatch: 'full' },
      { path: 'association', redirectTo: 'is-building', pathMatch: 'full' },
      { component: Page404Component, path: '404' },
      { component: PageIsBuildingComponent, path: 'is-building' },
      //{ component: SignupComponent, path: 'signup' },
    ],
  },

  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {

}
