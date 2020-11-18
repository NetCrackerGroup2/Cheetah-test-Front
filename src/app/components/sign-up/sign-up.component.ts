import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SignUpService} from '../../services/sign-up/sign-up.service';
import {User} from '../../models/user/user';
import {Subscription} from 'rxjs';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  signUpService: SignUpService;
  message: string;
  successMessage: string;

  constructor(private router: Router, signUpService: SignUpService) {
    this.signUpService = signUpService;
  }

  ngOnInit(): void {
  }

  regNewUser(): void {
    this.subscription = this.signUpService.postRegisteredUser()
      .pipe(first())
      .subscribe( {
        next: data => {
          if (data.status === 'success') {
            this.signUpService.user = new User();
            this.successMessage = 'Account has been created';
            this.message = '';
          } else {
            this.message = 'Invalid input';
            this.successMessage = '';
          }
        }
      }
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
