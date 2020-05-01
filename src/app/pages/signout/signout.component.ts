import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AccountService} from "../../services/account.service";

@Component({
  template: '',
  selector: 'app-signout',
})
export class SignoutComponent implements OnInit {

  constructor(
    private router: Router,
    private accountService: AccountService,
  ) {
  }

  ngOnInit() {
    this.accountService.signOut();
    this.router.navigate(['']);
  }

}
