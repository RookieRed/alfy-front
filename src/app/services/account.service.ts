import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private static me: User;

  constructor(
    private http: HttpClient,
  ) {
    AccountService.me = null;
  }

  public checkCredentials(username: string, password: string): Promise<any> {
    const formData = new FormData();
    formData.append('_username', username);
    formData.append('_password', password);
    return this.http.post(environment.apiURL + '/account/signin', formData).toPromise();
  }

  public signUp(userPayload: User): Promise<any> {
    return this.http.put(environment.apiURL + '/account/signup', JSON.stringify(userPayload)).toPromise();
  }

  public getUser(id: any) {
    return this.http.get<User>(environment.apiURL + '/account/' + id).toPromise();
  }

  public setSession(jwt: string) {
    localStorage.setItem('jwt', jwt);
    this.getUser('me').then(apiResponse => {
      localStorage.setItem('jwt', jwt);
    }, err => {
      console.error(err);
      this.signOut();
    });
  }

  public signOut(): void {
    localStorage.clear();
  }

  public isUserConnected(): boolean {
    return localStorage.getItem('jwt') != null;
  }

  public getMine(): Promise<any> {
    return this.http.get(environment.apiURL + '/account/me').toPromise();
  }

  public updateProfilePicture(uploadedPicture: File) {
    const formData = new FormData();
    formData.append('picture', uploadedPicture, uploadedPicture.name);
    return this.http.post(environment.apiURL + '/account/pictures', formData).toPromise();
  }

  public deleteAccount(user?: any): Promise<any> {
    const target = user instanceof User ? user.id : 'me';
    return this.http.delete(environment.apiURL + '/account/' + target).toPromise();
  }

  public update(userBean: User): Promise<any> {
    const payload = <any> Object.assign({}, userBean);
    delete payload.profilePicture;
    delete payload.role;
    if (payload.password == null || payload.password.length === 0) {
      delete payload.password;
    }
    // Address
    if (payload.address != null && payload.address.country != null) {
      payload.address.countryId = userBean.address.country.id;
      delete payload.address.country;
    } else {
      payload.address = null;
    }
    // Social
    const regex = /^https?:\/\//gm;
    if (payload.facebook != null && payload.facebook.length) {
      if (!regex.test(payload.facebook)) {
        payload.facebook = 'https://' + payload.facebook;
      }
    } else {
      payload.facebook = null;
    }
    if (payload.twitter != null && payload.twitter.length) {
      if (!regex.test(payload.twitter)) {
        payload.twitter = 'https://' + payload.twitter;
      }
    } else {
      payload.twitter = null;
    }
    if (payload.linkedIn != null && payload.linkedIn.length) {
      if (!regex.test(payload.linkedIn)) {
        payload.linkedIn = 'https://' + payload.linkedIn;
      }
    } else {
      payload.linkedIn = null;
    }

    // Sending
    return this.http.post(environment.apiURL + '/account/my-info', payload).toPromise();
  }

  isUsernameTaken(username: string): Promise<any> {
    return this.http.get(environment.apiURL + '/account/login/' + username).toPromise();
  }
}
