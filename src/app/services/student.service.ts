import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Pagination} from "../models/pagination";
import {ResponseContentType} from "@angular/http";

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
        params: {
          'p': '' + pagination.currentPage,
          'resultsPerPage': '' + pagination.resultsPerPage
        }
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
          'resultsPerPage': '' + pagination.resultsPerPage
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

  public downloadImportModel() {
    return this.http.get(environment.apiURL + '/students/import', {responseType: 'blob'}).toPromise()
      .then(file => {
        const url = window.URL.createObjectURL(file);
        const link = document.createElement('a');
        link.setAttribute('style', 'display: none;');
        document.body.appendChild(link);
        link.href = url;
        link.target = '_blank';
        link.download = 'model_import.xls';
        link.click();
        window.URL.revokeObjectURL(url);
        link.remove();
      });
  }

  public uploadImport(file: File): Promise<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(environment.apiURL + '/students/import', formData).toPromise();
  }
}
