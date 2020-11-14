import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, mapTo} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  constructor(private http: HttpClient) { }

  SendResetEmail(recoveryEmail: string): Observable<any>{
    return this.http.post<any>('/forgotpassword', recoveryEmail)
      .pipe(
        mapTo(true),
        catchError(error => {
          console.log(error.error);
          return of(false);
        })
      );
  }
}
