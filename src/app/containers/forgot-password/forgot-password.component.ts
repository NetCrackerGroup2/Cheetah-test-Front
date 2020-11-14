import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ResetPasswordService} from '../../services/reset-password.service';

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
  constructor(private http: HttpClient, private rserv: ResetPasswordService){}

  ngOnInit(): void {
  }
  resetPassword(): void{
    this.message = '*some problem occured';

    this.rserv.SendResetEmail(this.recoveryEmail).subscribe({
      next(x): void{
        this.message = x;
      }
    });


}


}
