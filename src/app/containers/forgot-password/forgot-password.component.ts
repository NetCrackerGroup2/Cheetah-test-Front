import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, mapTo} from 'rxjs/operators';
import {Observable, of} from 'rxjs';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  recoveryEmail: string;
  recoveryToken: string;
  message: string;
  isSent: boolean;
  constructor(private http: HttpClient,  ){}

  ngOnInit(): void {
  }
  resetPassword(): void{
    this.message = '*some problem occured';

    this.SendResetEmail().subscribe({
      next(x): void{
        if (x === true){
        this.message = 'message was sent to your e-mail';
      }
      }
    });


}
  SendResetEmail(): Observable<boolean>{
    const headers = new HttpHeaders({
      email: this.recoveryEmail,
    });
    return this.http.get<any>('/forgotpassword', {headers})
      .pipe(
        mapTo(true),
        catchError(error => {
          alert(error.error);
          return of(false);
        })
      );
  }

}
