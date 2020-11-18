import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ResetPasswordService} from '../../services/reset-password/reset-password.service';
import {RecoveryEmail} from '../../models/recoveryEmail/recovery-email';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
  emailForm: FormGroup;
  recoveryEmail: string;
  message: string;
  successMessage: string;
  isSent: boolean;
  loading = false;
  subscription: Subscription;


  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private resetPasswordService: ResetPasswordService) {
  }

  ngOnInit(): void {
    this.emailForm = this.formBuilder.group({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])
    });
  }

  get email(): any {
    return this.emailForm.get('email');
  }

  onSubmit(): void {
    this.message = '';
    this.successMessage = '';
    this.loading = true;

    const recoveryEmail = new RecoveryEmail();
    recoveryEmail.email = this.email.value;
    this.subscription = this.resetPasswordService.sendResetEmail(recoveryEmail).subscribe(
      data => {
        if (data) {
          this.message = '';
          this.successMessage = 'Confirmation was sent to your email';
        }
        this.loading = false;
      });
    this.resetPasswordService.messageSubject$.subscribe(message => {
        this.message = message;
      }
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
