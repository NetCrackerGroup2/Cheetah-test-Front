import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ResetPasswordService} from '../../services/reset-password/reset-password.service';
import {RecoveryEmail} from '../../models/recoveryEmail/recovery-email';
import {Router} from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  recoveryEmail: string;
  message: string;
  successMessage: string;
  isSent: boolean;
  loading = false;

  constructor(private http: HttpClient,
              private rserv: ResetPasswordService) {
  }

  ngOnInit(): void {
  }

  resetPassword(): void {
    this.message = '';
    this.successMessage = '';
    this.loading = true;

    const email = new RecoveryEmail();
    email.email = this.recoveryEmail;
    this.rserv.sendResetEmail(email).subscribe(
      data => {
        if (data) {
          this.message = '';
          this.successMessage = 'Confirmation was sent to your email';
        }
        this.loading = false;
      });
    this.rserv.messageSubject$.subscribe(message => {
        this.message = message;

      }
    );
  }
}
