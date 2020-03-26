import { Component, OnInit } from '@angular/core';
import { ProfileService} from 'src/app/services/profile.service'
import { Moment } from 'moment';
import { Address } from 'src/app/models/address';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent implements OnInit {

  private id : Number;
  private userName : string;
  private firstName : string;
  private lastName : string;
  private birthDay: Date | Moment;
  private age : string;
  private email : string;
  private phone : string;
  private role : string;
  private profilePicture: {path, name};
  private facebook : string;
  private linkedin : string;
  private twitter : string;
  private adress : Address;

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
      this.profilePicture = <{path, name}>respObj.profilePicture;
      this.facebook = <string>respObj.facebook;
      this.linkedin = <string>respObj.linkedin;
      this.twitter = <string>respObj.twitter;
      this.adress = <Address>respObj.adress;

      console.log(this.id);
      console.log(respObj.userName);
      console.log(respObj.firstName);
      console.log(respObj.lastName);
      console.log(this.birthDay);
      console.log(respObj.lastName);
      console.log(respObj.email);
      console.log(respObj.phone);
      console.log(respObj.role);
      console.log(respObj.profilePicture);
      console.log(respObj.facebook);
      console.log(respObj.linkedin);
      console.log(respObj.twitter);
      console.log(respObj.adress);

    }, err => {
      this.onApiError(err);
    });
  }

}
