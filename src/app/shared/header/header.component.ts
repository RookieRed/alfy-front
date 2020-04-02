import {ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AccountService} from "../../services/account.service";
import {AppRoutingModule} from "../../app-routing.module";
import {AuthGuard} from "../auth.guard";
import {Router} from "@angular/router";
import {BreakpointObserver, BreakpointState, MediaMatcher} from '@angular/cdk/layout';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnChanges {

  isMenuOpened: boolean;

  shownMenuLinks: Link[] = [];
  readonly menuLinks: Link[] = [
    { link: '/about', name: 'Accueil' },
    { link: '/directory', name: 'Annuaire' },
    { link: '/admin/students', name: 'Gestion des utilisateurs' },
    { link: '/profile/edit', name: 'Mon compte' },
    { link: '/signout', name: 'Se déconnecter' },
    { link: '/signin', name: 'Se connecter' },
    //{ link: '/about', name: 'Profile View' },
    // { link: '/signup', name: 'Inscription' },
  ];

  readonly tabsLinks: Link[] = [
    { link: '/about', name: 'Accueil' },
    { link: '/association', name: 'L\'association' },
    { link: '/high-school', name: 'Le lycée' },
    { link: '/faq', name: 'FAQ' },
    { link: '/profileview/{id}', name: 'Profile View' },
  ];
  isSmallScreen: boolean;

  constructor(
    private accountService: AccountService,
    private authGuard: AuthGuard,
    private router: Router,
    private cdRef: ChangeDetectorRef,
    private breakpointObserver: BreakpointObserver,
  ) {
    this.isMenuOpened = false;
  }

  public toggleMenu() {
    this.isMenuOpened = ! this.isMenuOpened;
  }

  public signout() {
    this.accountService.signOut();
    if (!this.authGuard.isEnabled(window.location.pathname)) {
      this.router.navigate(['']);
    }
  }

  isConnected() {
    return this.accountService.isUserConnected();
  }

  isEnabled(link: string): boolean {
    if (!this.accountService.isUserConnected() && link === '/signout') {
      return false;
    }
    if (this.accountService.isUserConnected() && (link === '/signin' || link === '/signup')) {
      return false;
    }
    return this.authGuard.isEnabled(link);
  }

  ngOnInit() {
    this.breakpointObserver.observe('(max-width: 960px)').subscribe((state) => {
      this.onBreakpointChanges(state.matches);
    });
  }

  private onBreakpointChanges(matches: boolean) {
    this.isSmallScreen = matches;
    if (matches) {
      this.shownMenuLinks = [...this.tabsLinks, ...this.menuLinks];
    } else {
      this.shownMenuLinks = this.menuLinks;
    }
    this.cdRef.markForCheck();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.cdRef.detectChanges();
  }
}

class Link {
  link: string;
  name: string;
}
