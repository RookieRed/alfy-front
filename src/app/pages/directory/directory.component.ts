import { Component, OnInit } from '@angular/core';
import {User} from "../../models/user";
import {StudentService} from "../../services/student.service";
import {PaginatedResults} from "../../models/paginatedResults";
import {Pagination} from "../../models/pagination";
import {environment} from "../../../environments/environment";
import {AccountService} from "../../services/account.service";
import {MatDialog} from "@angular/material";
import {ConfirmDialogComponent} from "../../shared/dialogs/confirm-dialog/confirm-dialog.component";
import {SimpleDialogComponent} from "../../shared/dialogs/simple-dialog/simple-dialog.component";

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
  isAdmin: boolean;

  constructor(
    private studentService: StudentService,
    private accountService: AccountService,
    private dialog: MatDialog,
  ) {
    this.searchValue = '';
    this.students = [];
    this.pagination = new Pagination({resultsPerPage: Pagination.DEFAULT_RESULTS_PER_PAGE, currentPage: 1});
  }

  public onSearchChange() {
    if (this.searchValue.length > 2) {
      this.studentService.searchByName(this.searchValue, this.pagination)
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

  public deleteUser(user: User) {
    if (this.isAdmin) {
      this.dialog.open(ConfirmDialogComponent, {
        width: '400px',
        data: {
          title: 'Confirmation de suppression',
          message: 'Voulez-vous vraiment supprimer le compte de ' + user.firstName + ' ' + user.lastName
            + ', ainsi que toutes ses données associées ?',
          confirmLabel: 'Confirmer',
          closeLabel: 'Annuler',
          type: 'info'
        }
      }).afterClosed().subscribe(confirmed => {
        if (confirmed) {
          this.accountService.deleteAccount(user)
            .then(apiRespoinse => {
              this.dialog.open(SimpleDialogComponent, {
                width: '400px',
                data: {
                  title: 'Compte supprimé',
                  message: 'Le compte de ' + user.firstName + ' ' + user.lastName + ' a bien été supprimé.',
                }
              });
            }, err => {
              console.error(err);
              this.dialog.open(SimpleDialogComponent, {
                width: '400px',
                data: {
                  title: 'Erreur serveur',
                  message: 'Une erreur est survenue. Le compte n\'a pas pu être supprimé',
                  type: 'error',
                }
              });
            });
            this.getAllStudents();
          }
        });
    }
  }

  private onApiError(err) {
    console.error(err);
    this.students = [];
    this.pagination = null;
    this.nbResults = 0;
  }

  onPaginationChanges(event) {
    this.pagination.resultsPerPage = event.pageSize;
    this.pagination.currentPage = event.pageIndex + 1;
    this.onSearchChange();
  }

  onImportChange(e) {
    if (e.target.files.length == 0) {
      return;
    }
    const file = e.target.files[0];
    this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Confirmation de l\'import',
        message: 'Vous êtes sur le point d\'éxectuer l\'importation de nouveaux utilisateurs. ' +
          'En cliquant sur confirmer le fichier sera envoyé au serveur et l\'import s\'exécutera.',
        confirmLabel: 'Confirmer',
        closeLabel: 'Annuler',
        type: 'info'
      }
    }).afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.studentService.uploadImport(file)
          .then(apiResponse => {
            this.dialog.open(SimpleDialogComponent, {
              width: '500px',
              data: {
                title: 'Etudiants importés',
                message: 'L\'import s\'est correctement déroulé.<br>'
                  + apiResponse.nbImported + " lignes importées et "
                  + apiResponse.nbErrors + " lignes non importées."
                  + (apiResponse.comments.length > 0 ? '<br><i>' + apiResponse.comments + '</i>' : ''),
              }
            }).afterClosed().subscribe(() => this.getAllStudents());
          }, err => {
            console.log(err);
            this.dialog.open(SimpleDialogComponent, {
              width: '400px',
              data: {
                title: 'Echec del\'import',
                message: "L'import des étudiants a échoué, une erreur serveur est survenue.",
                type: 'error'
              }
            });
          });
      }
    });
  }

  downloadModel() {
    this.studentService.downloadImportModel();
  }

  getProfilePictureURL(user: User): string {
    if (user == null || user.profilePicture == null) {
      return '/assets/img/default-avatar.png';
    }
    return environment.apiURL + '/' + user.profilePicture.path + user.profilePicture.name;
  }

  async ngOnInit() {
    this.getAllStudents();
    try {
      let user: User = await this.accountService.getMine();
      this.isAdmin = user.role == "ADMIN";
    } catch (e) {
      console.error(e);
    }
  }

  private getAllStudents() {
    this.studentService.getAll(this.pagination)
      .then((resp: any) => {
        const respObj = <PaginatedResults>resp;
        this.students = <User[]>respObj.results;
        this.nbResults = respObj.totalResults;
      }, err => {
        this.onApiError(err);
      });
  }
}
