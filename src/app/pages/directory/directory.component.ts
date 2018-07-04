import { Component, OnInit } from '@angular/core';
import {User} from "../../models/user";
import {StudentService} from "../../services/student.service";
import {Pagination} from "../../models/pagination";

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.scss']
})
export class DirectoryComponent implements OnInit {

  private allStudents: User[];
  students: User[];
  searchValue: string;
  nbResults: number;
  pagination: Pagination;

  constructor(
    private accountService: StudentService,
  ) {
    this.searchValue = '';
    this.students = [];
    this.allStudents = [];
    this.pagination = null;
  }

  public onSearchChange() {
    if (this.searchValue.length > 2) {
      this.accountService.searchByName(this.searchValue)
        .then(resp => {
          this.students = <User[]>resp;
          this.nbResults = (<User[]>resp).length;
        }, err => {
          console.log(err);
          this.students = [];
        });
    } else {
      this.students = this.allStudents;
      this.getAllStudents();
    }
  }

  previousPage() {

  }

  nextpage() {

  }

  ngOnInit() {
    this.getAllStudents();
  }

  private getAllStudents() {
    this.accountService.getAll()
      .then(resp => {
        if ((<User[]>resp).length != this.allStudents.length) {
          this.students = <User[]>resp;
          this.allStudents = <User[]>resp;
          this.nbResults = (<User[]>resp).length;
        }
      }, err => {
        console.log(err);
        this.students = [];
      });
  }
}
