import {Address} from "./address";
import {Moment} from "moment";
import {ApiFile} from "./file";
import {Study} from "./study";
import {Project} from "./project";

export class User {

  id: number;
  username: string;
  firstName: string;
  lastName: string;
  birthDay: Date | Moment;
  email: string;
  phone: string;
  role: string;
  profilePicture: ApiFile;
  coverPicture: ApiFile;
  facebook: string;
  linkedIn: string;
  twitter: string;
  instagram: string;
  baccalaureate: string;
  studies: Study[];
  jobTitle: string;
  projects: Project[];
  address: Address;
  password: string;


  constructor(obj?: { id: number, userName: string, firstName: string, lastName: string, birthDay: Date | Moment, email: string, phone: string, role: string, profilePicture: ApiFile, coverPicture: ApiFile, facebook: string, linkedIn: string, twitter: string, instagram: string, baccalaureate: string, studies: Study[], jobTitle: string, projects: Project[], address: Address, password: string }) {
    if (obj != null) {
      this.id = obj.id;
      this.username = obj.userName;
      this.firstName = obj.firstName;
      this.lastName = obj.lastName;
      this.birthDay = obj.birthDay;
      this.email = obj.email;
      this.phone = obj.phone;
      this.role = obj.role;
      this.profilePicture = obj.profilePicture;
      this.coverPicture = obj.coverPicture;
      this.facebook = obj.facebook;
      this.linkedIn = obj.linkedIn;
      this.twitter = obj.twitter;
      this.instagram = obj.instagram;
      this.baccalaureate = obj.baccalaureate;
      this.studies = obj.studies;
      this.jobTitle = obj.jobTitle;
      this.projects = obj.projects;
      this.address = obj.address;
      this.password = obj.password;
    }
  }
}
