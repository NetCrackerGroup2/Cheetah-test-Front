import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {catchError, mapTo, tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {User} from '../common/user/user';
import {JwtToken} from '../common/jwtToken/jwt-token';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private loggedUser: string;
  constructor(private http: HttpClient, private router: Router) {
  }

  login(user: User): Observable<JwtToken> {
    return this.http.post<JwtToken>('http://localhost:8080/api/login', user)
      .pipe(
        tap((newToken: JwtToken) => {
          console.log(`returned token: ${newToken.accessToken}`);
          this.doLoginUser(user.email, newToken.accessToken);
          this.router.navigate(['desktop']);
        }),
        catchError(this.handleError<JwtToken>('login')));
  }

  public doLoginUser(email: string, token: string): void {
    this.loggedUser = email;
    this.storeToken(token);
  }

  private storeToken(token: string): void {
    localStorage.setItem(this.JWT_TOKEN, token);
  }

  getJwtToken(): string {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  storeJwtToken(jwtToken: string): void {
    localStorage.setItem(this.JWT_TOKEN, jwtToken);
  }

  isLoggedIn(): boolean {
    return !!this.getJwtToken();
  }

  doLogoutUser(): void {
    this.loggedUser = null;
    this.removeToken();
    this.router.navigate(['/login']);
  }

  removeToken(): void {
    localStorage.removeItem(this.JWT_TOKEN);
  }

  // tslint:disable-next-line:typedef
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      if (error.status === 401) {
        this.router.navigate(['']);
      } else {
        return throwError(error);
      }
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}

