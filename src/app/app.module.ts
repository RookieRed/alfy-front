import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SignupComponent } from './pages/signup/signup.component';
import { SigninComponent } from './pages/signin/signin.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCommonModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatNativeDateModule, MatOptionModule,
  MatPaginatorModule,
  MatProgressSpinnerModule, MatSelectModule,
  MatSidenavModule,
  MatTabsModule,
  MatToolbarModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { AuthGuard } from './shared/auth.guard';
import { Page404Component } from './pages/page404/page404.component';
import { HomeComponent } from './shared/home/home.component';
import { HeaderComponent } from './shared/header/header.component';
import { AboutComponent } from './pages/about/about.component';
import { ProfileEditComponent } from './pages/profileEdit/profile-edit.component';
import { DirectoryComponent } from './pages/directory/directory.component';
import { CasePipe } from './shared/pipes/case.pipe';
import { AddressFormComponent } from './shared/forms/address-form/address-form.component';
import { SignoutComponent } from './pages/signout/signout.component';
import { MomentDateModule} from '@angular/material-moment-adapter';
import { SimpleDialogComponent } from './shared/dialogs/simple-dialog/simple-dialog.component';
import { ConfirmDialogComponent } from './shared/dialogs/confirm-dialog/confirm-dialog.component';
import {NgxMatSelectSearchModule} from 'ngx-mat-select-search';
import {SlideshowModule} from 'ng-simple-slideshow';
import {FlexLayoutModule} from '@angular/flex-layout';
import { PageIsBuildingComponent } from './pages/page-is-building/page-is-building.component';
import { AssociationComponent } from './pages/association/association.component';
import { HighSchoolComponent } from './pages/high-school/high-school.component';
import { FaqComponent } from './pages/faq/faq.component';
import { EditableElementComponent } from './shared/components/editable-element/editable-element.component';
import { AboutPicturesFormDialogComponent } from './shared/dialogs/about-pictures-form-dialog/about-pictures-form-dialog.component';
import {MatCheckboxModule} from '@angular/material/checkbox';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    Page404Component,
    HomeComponent,
    HeaderComponent,
    AboutComponent,
    ProfileEditComponent,
    DirectoryComponent,
    CasePipe,
    AddressFormComponent,
    SignoutComponent,
    SimpleDialogComponent,
    ConfirmDialogComponent,
    PageIsBuildingComponent,
    AssociationComponent,
    HighSchoolComponent,
    FaqComponent,
    EditableElementComponent,
    AboutPicturesFormDialogComponent,
  ],
  entryComponents: [
    SimpleDialogComponent,
    ConfirmDialogComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatToolbarModule,
    MatSidenavModule,
    MatCommonModule,
    MatListModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatGridListModule,
    MatButtonToggleModule,
    MatInputModule,
    MatIconModule,
    MatDividerModule,
    MatDialogModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatOptionModule,
    NgxMatSelectSearchModule,
    MomentDateModule,
    SlideshowModule,
    MatTabsModule,
    FlexLayoutModule,
    MatCheckboxModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    AuthGuard,
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
