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
    const body = new URLSearchParams();
    body.set('username', username);
    body.set('password', password);
    return this.http.post(environment.apiURL + '/signin', body).toPromise();
  }

  public setSession(user: User, jwt: string) {
    this.connectedUser = user;
    localStorage.setItem('jwt', jwt);
  }

  public signout(): void {
    localStorage.clear();
    this.connectedUser = null;
  }

  public isUserConnected(): boolean {
    return this.connectedUser != null
      && localStorage.getItem('jwt') != null;
  }

  public getConnectedUser(): User {
    return this.connectedUser;
  }
}
