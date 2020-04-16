import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Faq, Category, Question,  QuestionAdd, QuestionUpdate, CategoryUpdate, CategoryAdd} from '../models/pageFaq';
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

  public updateQuestion(question: QuestionUpdate): Observable<{}> {
    return this.http.post(environment.apiURL + '/faq/questions', question);
  }
  public updateCategory(category: CategoryUpdate): Observable<Category> {
    return this.http.post<Category>(environment.apiURL + '/faq/categories', category);
  }
  
  public addQuestion(question: QuestionAdd): Observable<Question> {
    return this.http.put<Question>(environment.apiURL + '/faq/questions', question);
  }

  public addCategory(category: CategoryAdd): Observable<Category> {
    return this.http.put<Category>(environment.apiURL + '/faq/categories', category);
  }

  public deleteQuestion(question: Question): Observable<{}> {
    return this.http.delete(environment.apiURL + '/faq/questions/' + question.id);
  }

  public deleteCategory(category: Category): Observable<{}> {
    return this.http.delete(environment.apiURL + '/faq/categories/' + category.id);
  }
}
