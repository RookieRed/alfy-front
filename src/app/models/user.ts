import {Address} from "./address";
import {Moment} from "moment";
import {File} from "./file";
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
  profilePicture: File;
  coverPicture: File;
  facebook: string;
  twitter: string;
  linkedIn: string;
  instagram: string;
  baccalaureate: string;
  studies: Study[];
  jobTitle: string;
  projects: Project[];
  address: Address;



  public constructor(obj?: {id?: number,
                     lastName?: string,
                     coverPicture?: File,
                     projects?: Project[],
                     firstName?: string,
                     username?: string,
                     email?: string,
                     phone?: string,
                     birthDay?: Date | Moment,
                     profilePicture?: File,
                     address?: Address,
                     role?: string,
                     facebook?: string,
                     twitter?: string,
                     instagram?: string,
                     baccalaureate?: string,
                     jobTitle?: string,
                     linkedIn?: string, }) {
    if (obj != null) {
      this.coverPicture = obj.coverPicture;
      this.projects = obj.projects;
      this.instagram = obj.instagram;
      this.baccalaureate = obj.baccalaureate;
      this.jobTitle = obj.jobTitle;
      this.id = obj.id;
      this.lastName = obj.lastName;
      this.firstName = obj.firstName;
      this.username = obj.username;
      this.email = obj.email;
      this.phone = obj.phone;
      this.profilePicture = obj.profilePicture;
      this.address = obj.address;
      this.birthDay = obj.birthDay;
      this.role = obj.role;
      this.facebook = obj.facebook;
      this.twitter = obj.twitter;
      this.linkedIn = obj.linkedIn;
    }
  }
}
