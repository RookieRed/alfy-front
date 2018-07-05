import { Component, OnInit } from '@angular/core';
import {User} from "../../models/user";
import {StudentService} from "../../services/student.service";
import {PaginatedResults} from "../../models/paginatedResults";
import {Pagination} from "../../models/pagination";

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.scss']
})
export class DirectoryComponent implements OnInit {

  students: User[];
  searchValue: string;
  nbResults: number;
  pagination: Pagination;

  constructor(
    private accountService: StudentService,
  ) {
    this.searchValue = '';
    this.students = [];
    this.pagination = new Pagination({resultsPerPage: Pagination.DEFAULT_RESULTS_PER_PAGE, currentPage: 1});
  }

  public onSearchChange() {
    if (this.searchValue.length > 2) {
      this.accountService.searchByName(this.searchValue, this.pagination)
        .then((resp: any) => {
          const respObj = <PaginatedResults>resp;
          this.students = <User[]>(respObj.results);
          this.pagination = new Pagination(respObj.pagination);
          this.nbResults = respObj.totalResults;
        }, err => {
          this.onApiError(err);
        });
    } else {
      this.getAllStudents();
    }
  }

  private onApiError(err) {
    console.log(err);
    this.students = [];
    this.pagination = null;
    this.nbResults = 0;
  }

  previousPage() {
    if (this.pagination != null && this.pagination.currentPage > 0) {
      this.pagination.currentPage--;
      this.onSearchChange();
    }
  }

  nextPage() {
    if (this.pagination != null && this.pagination.currentPage < this.pagination.totalPages) {
      this.pagination.currentPage++;
      this.onSearchChange();
    }
  }

  ngOnInit() {
    this.getAllStudents();
  }

  private getAllStudents() {
    this.accountService.getAll(this.pagination)
      .then((resp: any) => {
        const respObj = <PaginatedResults>resp;
        this.students = <User[]>respObj.results;
        this.nbResults = respObj.results.length;
      }, err => {
        this.onApiError(err);
      });
  }
}
