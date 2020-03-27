import { Component, OnInit } from '@angular/core';
import { ProfileService} from 'src/app/services/profile.service'
import { Moment } from 'moment';
import { Address } from 'src/app/models/address';
import { Study } from 'src/app/models/study';
import { Project } from 'src/app/models/project';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent implements OnInit {

  private id: Number;
  private userName: string; //undefined
  private firstName: string;
  private lastName: string;
  private birthDay: Date | Moment;
  private age: number;
  private birthYear: number;
  private currentYear: number;
  private email: string;
  private phone: string;
  private role: string;
  private profilePicture: File;
  private coverPicture: File;
  private facebook: string;
  private linkedIn: string;
  private twitter: string;
  private instagram: string;
  private address: Address;
  private baccalaureate: string;
  private studies: Study[];
  private jobTitle: string;
  private projects: Project[];
  private password: string;

  constructor(private profileService: ProfileService ) {
  }

  async ngOnInit() {
    document.body.style.background = "url('../../../assets/img/connection-background.jpg') no-repeat 0 0";
    document.body.style.backgroundSize = "auto";
    await this.getUser();
  }

  ngOnDestroy() {
    document.body.style.backgroundSize = "";
    document.body.style.background = "";
  }

  private onApiError(err) {
    console.error(err);
  }

  private exists(toCheck) {
    if ( toCheck ) {
      return true;
    }
    return false;
  }

  async getUser() {
    await this.profileService.getUser().then((resp: any) => {
      const respObj = resp;
      this.id = <Number>respObj.id;
      this.userName = <string>respObj.userName; //undefined
      this.firstName = <string>respObj.firstName;
      this.lastName = <string>respObj.lastName;
      this.birthDay = <Date | Moment>respObj.birthDay;
      this.email = <string>respObj.email;
      this.phone = <string>respObj.phone;
      this.role = <string>respObj.role;
      this.profilePicture = <File>respObj.profilePicture;
      this.coverPicture = <File>respObj.coverPicture;
      this.facebook = <string>respObj.facebook;
      this.linkedIn = <string>respObj.linkedIn;
      this.twitter = <string>respObj.twitter;
      this.instagram = <string>respObj.instagram;
      this.address = <Address>respObj.address;
      this.baccalaureate = <string>respObj.baccalaureate;
      this.studies = <Study[]>respObj.studies;
      this.jobTitle = <string>respObj.jobTitle;
      this.projects = <Project[]>respObj.projects;
      this.birthYear = Number((this.birthDay.toString()).substr(0, 4));
      this.currentYear = new Date().getFullYear();
      this.age = this.currentYear - this.birthYear;

      console.log(this.userName);

    }, err => {
      this.onApiError(err);
    });
  }

}
