import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) {
   }

  public getUser() {
    return this.http.get(environment.apiURL + '/account/my-info' ).toPromise();
  }

}
