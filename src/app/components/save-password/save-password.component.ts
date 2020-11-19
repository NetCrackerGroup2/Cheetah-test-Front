import {Component, OnDestroy, OnInit} from '@angular/core';
import {ResetPasswordService} from '../../services/reset-password/reset-password.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-save-password',
  templateUrl: './save-password.component.html',
  styleUrls: ['./save-password.component.css']
})
export class SavePasswordComponent implements OnInit, OnDestroy {
  passwordForm: FormGroup;
  subscription: Subscription;
  loading = false;
  resetToken: string;
  message: string;

  constructor(
    private formBuilder: FormBuilder,
    private resetService: ResetPasswordService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
          this.resetToken = params.token;
        }
      );
    this.passwordForm = this.formBuilder.group({
      password: new FormControl('', [
        Validators.required]),
      passwordConfirm: new FormControl('')
    });
  }

  get password(): any {
    return this.passwordForm.get('password');
  }
  get passwordConfirm(): any {
    return this.passwordForm.get('passwordConfirm');
  }

  onSubmit(): void {
    this.loading = true;
    if (this.password.value === this.passwordConfirm.value) {
      this.subscription = this.resetService.sendResetTokenAndPassword(this.resetToken, this.password.value).subscribe({
        next: body => {
          console.log(body.message);
          if (body.message === 'same.password') {
            this.message = 'Same password as before';
          } else if (body.message === 'message.resetPasswordSuc') {
            this.router.navigate(['']);
          } else if (body.message === 'reset.token.null') {
            this.message = 'Reset token doesn\'t exist';
          } else if (body.message === 'token.expired') {
            this.message = 'You have already changed the password';
          } else if (body.message === 'token.invalid') {
            this.message = 'This link is invalid';
          }
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        }
      });
    } else {
      this.message = 'Password in confirmation doesn\'t match';
    }

  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
