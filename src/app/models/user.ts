export class User {

  id: number;
  lastName: string;
  firstName: string;
  username: string;
  email: string;
  birthDay: Date;
  role: string;

  public constructor(obj?: {id?: number,
                     lastName?: string,
                     firstName?: string,
                     username?: string,
                     email?: string,
                     birthDay?: Date,
                     role?: string}) {
    this.id = obj.id;
    this.lastName = obj.lastName;
    this.firstName = obj.firstName;
    this.username = obj.username;
    this.email = obj.email;
    this.birthDay = obj.birthDay;
    this.role = obj.role;
  }
}
