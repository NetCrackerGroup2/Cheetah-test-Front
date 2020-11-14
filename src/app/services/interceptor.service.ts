import { Injectable } from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AuthService} from './auth.service';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{

  token: string;
  constructor(private auth: AuthService, private router: Router) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.auth.isLoggedIn()){
      this.token = this.auth.getJwtToken();
      const authReq = req.clone({
        headers: new HttpHeaders({
          'Content-type': 'aplication/json',
          Authorization: `Bearer ${this.token}`
        })
      });
      return next.handle(authReq).pipe(catchError(error => {
        if (error instanceof HttpErrorResponse && error.status === 401){
          console.log('unauthorised access.redirecting to /login');
          this.router.navigate(['/login']);
        }else{
          console.log(error);
        }
        return throwError(error);
      }));




    }
  }
}
