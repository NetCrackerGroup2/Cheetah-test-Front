import {Injectable} from '@angular/core';
import {User} from '../../models/user/user';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {ServerResponse} from '../../models/serverResponse/ServerResponse';
import {catchError, map, mapTo} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {
  constructor(private http: HttpClient) {
  }

  postRegisteredUser(user: User): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/register`, user)
      .pipe(
        catchError(error => {
          console.log(error.error);
          return of(new ServerResponse());
        })
      );
  }

}
