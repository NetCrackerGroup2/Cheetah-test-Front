import {Injectable} from '@angular/core';
import {UserRegistration} from '../../common/userRegistration/userRegistration';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {ServerResponse} from '../../common/serverResponse/ServerResponse';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {
  private u: UserRegistration;

  constructor(private http: HttpClient) {
    this.u = new UserRegistration();
  }

  get user(): UserRegistration {
    return this.u;
  }

  set user(value: UserRegistration) {
    this.u = value;
  }

  postRegisteredUser(): Observable<ServerResponse> {
    console.log(this.user);
    return this.http.post<ServerResponse>('http://localhost:8080/api/register', this.user)
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
