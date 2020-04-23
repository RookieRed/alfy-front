import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AboutService {

  constructor(private http : HttpClient) {

   }

  public getAbout() { 
     return this.http.get(environment.apiURL + '/pages/about').toPromise();
  }

}
