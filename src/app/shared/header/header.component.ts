import {Component, Input, OnInit} from '@angular/core';
import {AccountService} from "../../services/account.service";
import {AppRoutingModule} from "../../app-routing.module";
import {AuthGuard} from "../auth.guard";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isMenuOpened: boolean;

  readonly allMenuLinks: Link[] = [
    { link: '/about', name: 'Accueil' },
    { link: '/directory', name: 'Annuaire' },
    { link: '/admin/students', name: 'Gestion des utilisateurs' },
    { link: '/profile/edit', name: 'Mon compte' },
    { link: '/signout', name: 'Se déconnecter' },
    { link: '/signin', name: 'Se connecter' },
    { link: '/signup', name: 'Inscription' },
  ];

  constructor(
    private accountService: AccountService,
    private authGuard: AuthGuard,
    private router: Router,
  ) {
    this.isMenuOpened = false;
  }

  public toggleMenu() {
    this.isMenuOpened = ! this.isMenuOpened;
  }

  public signout() {
    this.accountService.signout();
    if (!this.authGuard.isEnabled(window.location.pathname)) {
      this.router.navigate(['']);
    }
  }

  isConnected() {
    return this.accountService.isUserConnected();
  }

  isEnabled(link: string): boolean {
    if (!this.accountService.isUserConnected() && link == '/signout') {
      return false;
    }
    if (this.accountService.isUserConnected() && (link == '/signin' || link == '/signup')){
      return false;
    }
    return this.authGuard.isEnabled(link);
  }

  ngOnInit() { }

}

class Link {
  link: string;
  name: string;
}
