import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AuthService} from '../../services/auth/auth.service';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private authenticationService: AuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const user = this.authenticationService.userValue;
    const isLoggedIn = user && user.accessToken;
    const isApiUrl = request.url.startsWith(environment.apiUrl);
    if (isLoggedIn && isApiUrl) {
      request = request.clone({
        setHeaders: {
          authorization : `Bearer ${user.accessToken}`,
        }
      });
      console.log(request);
      return next.handle(request);
    }

    return next.handle(request);
  }
}
