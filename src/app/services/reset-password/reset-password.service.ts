import { Injectable } from '@angular/core';
import {Observable, of, Subject, throwError} from 'rxjs';
import {catchError, map, mapTo} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {RecoveryEmail} from '../../models/recoveryEmail/recovery-email';
import {ResetPassword} from '../../models/resetPassword/reset-password';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {
  constructor(private http: HttpClient) { }

  sendResetEmail(recoveryEmail: RecoveryEmail): Observable<any>{
    return this.http.post<any>(`${environment.apiUrl}/api/reset-password`, recoveryEmail)
      .pipe(
        map(data => {
          return data.message;
        }),
        catchError(error => {
          return of (error);
        })
      );

  }

  sendResetTokenAndPassword(resetToken: string, password: string): Observable<any> {
    const resetPasswordAttributes = new ResetPassword(resetToken, password);
    return this.http.post<any>(`${environment.apiUrl}/api/save-password`, resetPasswordAttributes)
      .pipe(
        map(data => {
          return data.message;
        }),
        catchError(error => {
          return of (error);
        })
      );
  }
}
