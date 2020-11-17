import { Injectable } from '@angular/core';
import {Observable, of, Subject, throwError} from 'rxjs';
import {catchError, mapTo} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {RecoveryEmail} from '../../common/recoveryEmail/recovery-email';
import {ResetPassword} from '../../common/resetPassword/reset-password';
import {Status} from '../../common/status/status';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {
  private messageSubject = new Subject<string>();
  public messageSubject$ = this.messageSubject.asObservable();
  constructor(private http: HttpClient) { }

  sendResetEmail(recoveryEmail: RecoveryEmail): Observable<any>{
    console.log(recoveryEmail);
    return this.http.post<any>('http://localhost:8080/api/reset-password', recoveryEmail)
      .pipe(
        mapTo(true),
        catchError(error => {
          console.log(error.error);
          if (error.status === 200){
            this.messageSubject.next('Confirmation was sent to your email');
          }
          if (error.status === 400){
            this.messageSubject.next('Invalid email');
          }
          return of(false);
        })
      );

  }

  sendResetTokenAndPassword(resetToken: string, password: string): Observable<Status> {
    const resetPasswordAttributes = new ResetPassword(resetToken, password);
    return this.http.post<Status>('http://localhost:8080/api/save-password', resetPasswordAttributes)
      .pipe(
        catchError(error => {
        if (error.status === 400){
          console.log(error.error);
          return of(error.error);
        } else {
          return throwError(error);
        }
        })
      );
  }
}
