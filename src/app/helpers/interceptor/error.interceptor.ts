import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';
import {AuthService} from '../../services/auth/auth.service';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            console.log('IN ERROR INTERCEPTOR: ' + err.error.message);
            if ([401, 403].indexOf(err.status) !== -1) {

                this.authenticationService.logout();
            }
            const error = err.error.message || err.statusText;
            return throwError(error);
        }));
    }
}
