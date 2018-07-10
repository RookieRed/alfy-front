import { Component, OnInit } from '@angular/core';
import {AccountService} from "../../services/account.service";
import {AuthGuard} from "../auth.guard";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private accountService :AccountService,
    private auth: AuthGuard,
    private router: Router,
  ) { }

  async ngOnInit() {
    if (this.accountService.isUserConnected()) {
      try {
        await this.accountService.getMine();
      } catch (e) {
        console.log(e);
        this.accountService.signout();
        if (!this.auth.isEnabled(window.location.pathname)) {
          this.router.navigate(['']);
        }
      }
    }
  }
}
