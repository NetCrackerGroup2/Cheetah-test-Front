import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, mapTo} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  constructor(private http: HttpClient) { }

  sendResetEmail(recoveryEmail: string): Observable<any>{
    return this.http.post<any>('http://localhost:8080/api/reset-password', recoveryEmail)
      .pipe(
        mapTo(true),
        catchError(error => {
          console.log(error.error);
          return of(false);
        })
      );
  }

  // sendResetTokenAndPassword(resetToken: string, password: string): Observable<any> {
    // return this.http.post<any>('http://localhost:8080/api/save-password', )
    //   .pipe(
    //     mapTo(true),
    //     catchError(error => {
    //       console.log(error.error);
    //       return of(false);
    //     })
    //   );
  // }
}
