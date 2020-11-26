import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { UiService } from '../services/ui.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private _UIService: UiService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let currentUser: any = localStorage.getItem('tbms-data');

    request = request.clone({
      setHeaders: {
        Authorization: (currentUser != null) ? `${JSON.parse(
          currentUser
        ).token}` : '',
        ContentType: 'application/x-www-form-urlencoded'
      }
    });

    return next.handle(request).pipe(
      tap(
        () => { },
        err => {
          if (err.status === 401) {
            this.clear();
          }
        }
      )
    );

  }

  clear() {
    localStorage.clear();
    this._UIService.showSnackbar('Kindly re-login, authentication refreshed..!! ');
    this.router.navigateByUrl('/');
  }

}
