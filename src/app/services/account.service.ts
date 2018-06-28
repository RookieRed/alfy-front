import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import {User} from "../models/user";
import {$QUESTION} from "codelyzer/angular/styles/chars";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private http: HttpClient
  ) { }

  public checkCredentials(username: string, password: string): Promise<any> {
    let formData = new FormData();
    formData.append('_username', username);
    formData.append('_password', password);
    return this.http.post(environment.apiURL + '/account/signin', formData).toPromise();
  }

  public getUser(id: any) {
    return this.http.get<User>(environment.apiURL + '/account/' + id).toPromise();
  }

  public setSession(jwt: string) {
    localStorage.setItem('jwt', jwt);
    this.getUser('me').then(apiResponse => {
      localStorage.setItem('jwt', jwt);
    }, err => {
      this.signout();
    });
  }

  public signout(): void {
    localStorage.clear();
  }

  public isUserConnected(): boolean {
    return localStorage.getItem('jwt') != null;
  }
}
