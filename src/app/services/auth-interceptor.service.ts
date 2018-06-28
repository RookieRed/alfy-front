import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let jwt = localStorage.getItem('jwt');
    if (jwt != null) {
      let ret = req.clone({
        setHeaders: {
          Authorization: 'Bearer ' + jwt,
        }
      });
      return next.handle(ret);
    } else {
      return next.handle(req);
    }
  }
}
