import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ResetPasswordService} from '../../services/reset-password.service';
import {RecoveryEmail} from '../../common/recoveryEmail/recovery-email';
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

  constructor(private http: HttpClient,
              private rserv: ResetPasswordService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  resetPassword(): void {
    const email = new RecoveryEmail();
    email.email = this.recoveryEmail;
    this.rserv.sendResetEmail(email).subscribe(
      data => {
        console.log(data);
        if (data) {
          this.message = '';
          this.successMessage = 'Confirmation was sent to your email';
        }
      });
    this.rserv.messageSubject$.subscribe(message => {
        this.message = message;
      }
    );
  }
}
