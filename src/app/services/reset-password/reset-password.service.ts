import { Injectable } from '@angular/core';
import {Observable, of, Subject, throwError} from 'rxjs';
import {catchError, mapTo} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {RecoveryEmail} from '../../models/recoveryEmail/recovery-email';
import {ResetPassword} from '../../models/resetPassword/reset-password';
import {Status} from '../../models/status/status';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {
  private messageSubject = new Subject<string>();
  public messageSubject$ = this.messageSubject.asObservable();
  constructor(private http: HttpClient) { }

  sendResetEmail(recoveryEmail: RecoveryEmail): Observable<any>{
    return this.http.post<any>(`${environment.apiUrl}/reset-password`, recoveryEmail)
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
    return this.http.post<Status>(`${environment.apiUrl}/save-password`, resetPasswordAttributes)
      .pipe(
        catchError(error => {
        if (error.status === 400){
          return of(error.error);
        } else {
          return throwError(error);
        }
        })
      );
  }
}
