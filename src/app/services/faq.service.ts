import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Faq, Category, Question,  QuestionAdd} from '../models/pageFaq';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FaqService {

  constructor(
    private http: HttpClient
    ) { }

  public getFAQ() {
    return this.http.get(environment.apiURL + '/pages/faq' ).toPromise();
  }

  public updateQuestion(question: Question): Observable<{}> {
    return this.http.put(environment.apiURL + '/faq/categories', question);
  }
  
  public addQuestion(question: QuestionAdd): Observable<Question> {
    return this.http.post<Question>(environment.apiURL + '/faq/questions', question);
  }

  public deleteQuestion(question: Question): Observable<{}> {
    return this.http.delete(environment.apiURL + '/faq/questions/' + question.id);
  }
}
