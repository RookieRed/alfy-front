import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Pagination} from "../models/pagination";

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(
    private http: HttpClient
  ) { }

  public getAll(pagination?: Pagination) {
    let options;
    if (pagination != null && pagination.currentPage != null) {
      options = {
        params: {'p': '' + pagination.currentPage}
      };
      if (pagination.resultsPerPage != null) {
        options.params.resultsPerPage = pagination.resultsPerPage;
      }
    }
    return this.http.get(environment.apiURL + '/students', options).toPromise();
  }

  public searchByName(searchValue: string, pagination?: Pagination) {
    let options;
    if (pagination != null && pagination.currentPage != null) {
      options = {
        params: {
          'search': searchValue,
          'p': '' + pagination.currentPage,
        }
      };
      if (pagination.resultsPerPage != null) {
        options.params.resultsPerPage = pagination.resultsPerPage;
      }
    } else {
      options = {
        params: {
          'search': searchValue
        }
      };
    }
    return this.http.get(environment.apiURL + '/students', options).toPromise();
  }
}
