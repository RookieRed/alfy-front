import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AccountService} from "../services/account.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private readonly connectionLinks: string[] = [
    '/signup',
    '/signin',
  ];
  private readonly unprotectedLinks: string[] = this.connectionLinks.concat([
    '/about',
    '/history',
    '/fustel',
    '/faq',
  ]);
  private readonly userProtectedLinks: string[] = [
    '/directory',
    '/profile/edit',
    '/signout',
  ];

  constructor(
    private accountService: AccountService,
    private router: Router
  ) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url: string = state.url;
    if (!this.accountService.isUserConnected() && !this.isUnprotected(url)) {
      this.router.navigate(["signin"]);
      return false;
    } else if (this.accountService.isUserConnected() && this.isConnection(url)) {
      this.router.navigate(["/"]);
      return false;
    } else if (this.accountService.isUserConnected() && this.isUserProtected(url)) {
      return true;
    }
    return true;
  }

  public isEnabled(link: string) {
    return (this.accountService.isUserConnected() && this.isUserProtected(link))
      || this.isUnprotected(link);
  }

  private isUnprotected(link: string) {
    return this.unprotectedLinks.some(e => {
      return link === <string>e;
    });
  }

  private isConnection(link: string) {
    return this.connectionLinks.some(e => {
      return link === <string>e;
    });
  }

  private isUserProtected(link: string) {
    return this.userProtectedLinks.some(e => {
      return link === <string>e;
    });
  }
}
