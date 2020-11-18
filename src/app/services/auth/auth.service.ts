import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import {Router} from '@angular/router';
import {LoginDto} from '../../models/loginDto/loginDto';
import {environment} from '../../../environments/environment';
import {User} from '../../models/user/user';
import jwt_decode from 'jwt-decode';
import {catchError, map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly USER_CONST = 'user';
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem(this.USER_CONST)));
    this.user = this.userSubject.asObservable();
  }

  login(loginDto: LoginDto): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/login`, loginDto)
      .pipe(map(token => {
          const user: User = this.extractUserFromPayload(token.accessToken);

          localStorage.setItem(this.USER_CONST, JSON.stringify(user));

          this.userSubject.next(token);

          return token;
        }));
  }

  extractUserFromPayload(accessToken: string): User {
    try{
      const payload: any = jwt_decode(accessToken);

      const newUser: User = new User();
      newUser.email = payload.sub;
      newUser.name = payload.name;
      newUser.role = payload.role;
      newUser.accessToken = accessToken;

      return newUser;
    }
    catch (error){
      console.log(error);
      return null;
    }
  }

  logout(): void {
    localStorage.removeItem(this.USER_CONST);
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

  public get userValue(): User {
    return this.userSubject.value;
  }
}

