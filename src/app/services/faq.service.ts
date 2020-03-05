import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Faq, Category, Question } from '../models/pageFaq';

@Injectable({
  providedIn: 'root'
})
export class FaqService {

  constructor(
    private http: HttpClient
    ) { }

  public getFAQ() {
    console.log(this.http.get(environment.apiURL + '​/pages/faq​' ).toPromise());
    return this.http.get(environment.apiURL + '​/pages/faq​' ).toPromise();
  }
}
