import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Section, HTMLSection } from 'src/app/models/sections';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AboutService {

  constructor(private http : HttpClient) {

   }

  public getAbout() { 
     return this.http.get(environment.apiURL + '/pages/about').toPromise();
  }

  public updatePresentation(section: HTMLSection): Observable<Section> {
    return this.http.put<Section>(environment.apiURL + '/pages-sections/'+ section.id, section);
  }

}
