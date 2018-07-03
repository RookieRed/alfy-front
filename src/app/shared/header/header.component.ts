import {Component, Input, OnInit} from '@angular/core';
import {AccountService} from "../../services/account.service";
import {AppRoutingModule} from "../../app-routing.module";
import {AuthGuard} from "../auth.guard";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isMenuOpened: boolean;
  linksList: Link[];

  private readonly allMenuLinks: Link[] = [
    { link: '/about', name: 'Accueil' },
    { link: '/directory', name: 'Annuaire' },
    { link: '/admin/users', name: 'Gestion des utilisateurs' },
    { link: '/signin', name: 'Se connecter' },
  ];

  constructor(
    private accountService: AccountService,
    private authGuard: AuthGuard,
  ) {
    this.isMenuOpened = false;
    this.linksList = [];
  }

  public toggleMenu() {
    this.isMenuOpened = ! this.isMenuOpened;
  }

  public signout() {
    this.accountService.signout(window.location.pathname);
  }

  isConnected() {
    console.log(this.accountService.isUserConnected());
    return this.accountService.isUserConnected();
  }

  ngOnInit() {
    for (let link of this.allMenuLinks) {
      if (this.authGuard.isEnabled(link.link)) {
        this.linksList.push(link);
      }
    }
  }

}

class Link {
  link: string;
  name: string;
}
