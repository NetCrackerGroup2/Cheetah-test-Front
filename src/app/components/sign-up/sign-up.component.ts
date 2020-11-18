import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {SignUpService} from '../../services/sign-up/sign-up.service';
import {User} from '../../models/user/user';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signUpService: SignUpService;
  message: string;
  successMessage: string;
  constructor(private router: Router, signUpService: SignUpService) {
    this.signUpService = signUpService;
  }

  ngOnInit(): void {
  }

  regNewUser(): void {
    this.signUpService.postRegisteredUser().subscribe(
      data => {
        if (data.status === 'success') {
          this.signUpService.user = new User();
          this.successMessage = 'Account has been created';
          this.message = '';
        } else {
          this.message = 'Invalid input';
          this.successMessage = '';
        }
      }
    );
  }
}
