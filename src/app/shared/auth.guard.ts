import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AccountService} from "../services/account.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private accountService: AccountService,
    private router: Router
  ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url: string = state.url;
    if (!this.accountService.isUserConnected()
      && (url !== <string>"/signin" && url !== <string>"/signup" && url !== <string>"/signout")) {
      this.router.navigate(["signin"]);
      return false;
    } else if (this.accountService.isUserConnected()
      && (url === <string>"/signin" || url === <string>"/signup" || url === <string>"/signout")) {
      this.router.navigate(["/"]);
      return false;
    }
    return true;
  }
}
