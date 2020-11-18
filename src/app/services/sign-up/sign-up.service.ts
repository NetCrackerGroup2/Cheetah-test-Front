import {Injectable} from '@angular/core';
import {User} from '../../models/user/user';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {ServerResponse} from '../../models/serverResponse/ServerResponse';
import {catchError} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {
  private u: User;

  constructor(private http: HttpClient) {
    this.u = new User();
  }

  get user(): User {
    return this.u;
  }

  set user(value: User) {
    this.u = value;
  }

  postRegisteredUser(): Observable<ServerResponse> {
    console.log(this.user);
    return this.http.post<ServerResponse>(`${environment.apiUrl}/register`, this.user)
      .pipe(
        catchError(this.handleError<ServerResponse>('postRegisteredUser', new ServerResponse()))
      );
  }

  // tslint:disable-next-line:typedef
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
