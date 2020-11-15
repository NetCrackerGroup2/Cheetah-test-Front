import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AuthService} from './auth.service';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private authenticationService: AuthService,
              private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authenticationService.isLoggedIn()
      && req.url.indexOf('reset-password') === -1
      && req.url.indexOf('save-password') === -1) {
      const authReq = req.clone({
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.authenticationService.getJwtToken()}`
        })
      });
      return next.handle(authReq);
    } else {
        return next.handle(req).pipe(catchError(err => {
          if (err.status === 403) {
            this.router.navigate(['']);
          } else {
            return throwError(err);
          }
      }));
    }
  }
}
