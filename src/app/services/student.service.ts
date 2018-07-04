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

  public getAll() {
    return this.http.get(environment.apiURL + '/students').toPromise();
  }

  searchByName(searchValue: string, pagination?: Pagination) {
    return this.http.get(environment.apiURL + '/students', {params: {'search': searchValue}}).toPromise();
  }
}
