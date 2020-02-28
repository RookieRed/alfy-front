import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Category } from '../models/pageFaq';

@Injectable({
  providedIn: 'root'
})
export class FaqService {

  constructor(
    private http: HttpClient
    ) { }

  public getCategories() {
    return this.http.get<Category>(environment.apiURL + '​/pages​/faq​' ).toPromise();
  }
}
