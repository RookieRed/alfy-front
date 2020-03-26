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
  private userName: string;
  private firstName: string;
  private lastName: string;
  private birthDay: Date | Moment;
  private age: number;
  private birthYear : number;
  private currentYear : number;
  private email: string;
  private phone: string;
  private role: string;
  private profilePicture: File;
  private coverPicture: File;
  private facebook: string;
  private linkedin: string;
  private twitter: string;
  private adress: Address;
  private baccalaureate: string;
  private studies: Study[];
  private jobTitle: string;
  private projects: Project[];
  private password: string;

  constructor(private profileService : ProfileService ) {
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

  async getUser() {
    await this.profileService.getUser().then((resp: any) => {
      const respObj = resp;
      this.id = <Number>respObj.id;
      this.userName = <string>respObj.userName;
      this.firstName = <string>respObj.firstName;
      this.lastName = <string>respObj.lastName;
      this.birthDay = <Date | Moment>respObj.birthDay;
      this.email = <string>respObj.email;
      this.phone = <string>respObj.phone;
      this.role = <string>respObj.role;
      this.profilePicture = <File>respObj.profilePicture;
      this.coverPicture = <File>respObj.coverPicture;
      this.facebook = <string>respObj.facebook;
      this.linkedin = <string>respObj.linkedin;
      this.twitter = <string>respObj.twitter;
      this.adress = <Address>respObj.adress;
      this.baccalaureate = <string>respObj.baccalaureate;
      this.studies = <Study[]>respObj.studies;
      this.jobTitle = <string>this.jobTitle;
      this.projects = <Project[]>this.projects;
      this.password = <string>this.password;
      this.birthYear = Number((this.birthDay.toString()).substr(0, 4));
      this.currentYear = new Date().getFullYear();
      this.age = this.currentYear - this.birthYear;

      console.log(this.id);
      console.log(this.userName);
      console.log(this.firstName);
      console.log(this.lastName);
      console.log(this.birthDay);
      console.log(this.birthYear);
      console.log(this.currentYear);
      console.log(this.age);
      console.log(this.email);
      console.log(this.phone);
      console.log(this.role);
      console.log(this.profilePicture);
      console.log(this.coverPicture);
      console.log(this.facebook);
      console.log(this.linkedin);
      console.log(this.twitter);
      console.log(this.adress);
      console.log(this.baccalaureate);
      console.log(this.studies);
      console.log(this.jobTitle);
      console.log(this.projects);
      console.log(this.password);

    }, err => {
      this.onApiError(err);
    });
  }

}
