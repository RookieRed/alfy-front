import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private connectedUser: User;

  constructor(
    private http: HttpClient
  ) {
    this.connectedUser = null;
  }

  public checkCredentials(username: string, password: string): Promise<any> {
    let formData = new FormData();
    formData.append('_username', username);
    formData.append('_password', password);
    return this.http.post(environment.apiURL + '/account/signin', formData).toPromise();
  }

  public getUser(id: any) {
    return this.http.get(environment.apiURL + '/account/' + id).toPromise();
  }

  public setSession(jwt: string) {
    localStorage.setItem('jwt', jwt);
    this.getUser('me').then(apiResponse => {
      this.connectedUser = new User(apiResponse);
    }, err => {
      this.signout();
    });
  }

  public signout(): void {
    localStorage.clear();
    this.connectedUser = null;
  }

  public isUserConnected(): boolean {
    return this.connectedUser != null && this.connectedUser.id != 0
      && localStorage.getItem('jwt') != null;
  }

  public getConnectedUser(): User {
    return this.connectedUser;
  }
}
