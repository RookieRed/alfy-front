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
    { link: '/admin/students', name: 'Gestion des utilisateurs' },
    { link: '/profile/edit', name: 'Mon compte' },
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
    return this.accountService.isUserConnected();
  }

  ngOnInit() {
    for (let link of this.allMenuLinks) {
      if (this.authGuard.isEnabled(link.link)) {
        this.linksList.push(link);
      }
    }
    if (this.accountService.isUserConnected()) {
      this.linksList.push({ link: '/signout', name: 'Se déconnecter' });
    } else {
      this.linksList.push({ link: '/signin', name: 'Se connecter' });
    }
  }

  onLinkClick() {
    this.isMenuOpened = false;
    document.getElementById('app-content').focus();
  }

}

class Link {
  link: string;
  name: string;
}
