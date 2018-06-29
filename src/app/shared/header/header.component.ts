import { Component, OnInit } from '@angular/core';
import {AccountService} from "../../services/account.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  private isMenuOpened: boolean;
  private list;

  constructor(
    private accountService: AccountService,
  ) {
    this.isMenuOpened = false;
    this.list = ['a', 'b', 'agf', 'aougbae'];
  }

  public toggleMenu() {
    this.isMenuOpened = ! this.isMenuOpened;
  }

  public signout() {
    this.accountService.signout();
  }

  ngOnInit() { }

}
