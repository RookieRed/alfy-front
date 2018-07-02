import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AccountService} from "../services/account.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private readonly connectionLinks: string[] = [
    '/signup',
    '/signin',
    '/signout',
  ];
  private readonly unprotectedLinks: string[] = this.connectionLinks.concat([
    '/users',
    '/about'
  ]);

  constructor(
    private accountService: AccountService,
    private router: Router
  ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url: string = state.url;
    if (!this.accountService.isUserConnected() && !this.isUnprotected(url)) {
      this.router.navigate(["signin"]);
      return false;
    } else if (this.accountService.isUserConnected() && this.isConnection(url)) {
      this.router.navigate(["/"]);
      return false;
    }
    return true;
  }

  private isUnprotected(link: string) {
    return this.unprotectedLinks.some( e => {
      return link === <string> e;
    });
  }

  private isConnection(link: string) {
    return this.connectionLinks.some( e => {
      return link === <string> e;
    });
  }
}
