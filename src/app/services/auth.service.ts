import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, mapTo, tap} from 'rxjs/operators';
import {Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private loggedUser: string;
  constructor(private http: HttpClient, private router: Router) { }

  login(user: {email: string, password: string}): Observable<boolean>{
    return this.http.post<any>('/login', user)
      .pipe(
        tap(token => this.doLoginUser(user.email, token)),
        mapTo(true),
        catchError(error => {
          alert(error.error);
          return of(false);
        })
      );
  }
  private doLoginUser(email: string, token: string): void{
    this.loggedUser = email;
    this.storeToken(token);
  }
  private storeToken(token: string): void{
    localStorage.setItem(this.JWT_TOKEN, token);
  }
  getJwtToken(): string{
   return localStorage.getItem(this.JWT_TOKEN);
}
  storeJwtToken(jwtToken: string): void{
    localStorage.setItem(this.JWT_TOKEN, jwtToken);
  }
  isLoggedIn(): boolean{
    return !!this.getJwtToken();
  }
  doLogoutUser(): void{
    this.loggedUser = null;
    this.removeToken();
    this.router.navigate(['/login']);
  }
  removeToken(): void{
    localStorage.removeItem(this.JWT_TOKEN);
  }


}

