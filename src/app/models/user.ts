import {Address} from "./address";
import {Moment} from "moment";

export class User {

  id: number;
  lastName: string;
  password: string;
  firstName: string;
  username: string;
  phone: string;
  email: string;
  birthDay: Date | Moment;
  profilePicture: {path, name};
  address: Address;
  role: string;
  facebook: string;
  twitter: string;
  linkedIn: string;

  public constructor(obj?: {id?: number,
                     lastName?: string,
                     firstName?: string,
                     username?: string,
                     email?: string,
                     phone?: string,
                     birthDay?: Date | Moment,
                     profilePicture?: {path, name},
                     address?: Address,
                     role?: string,
                     facebook?: string,
                     twitter?: string,
                     linkedIn?: string, }) {
    if (obj != null) {
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
