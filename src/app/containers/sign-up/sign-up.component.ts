import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {SignUpService} from '../../services/sign-up/sign-up.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signUpService: SignUpService;

  constructor(private router: Router, signUpService: SignUpService) {
    this.signUpService = signUpService;
  }

  ngOnInit(): void {
  }

  regNewUser(): void {
    this.signUpService.postRegisteredUser().subscribe();
  }
}
