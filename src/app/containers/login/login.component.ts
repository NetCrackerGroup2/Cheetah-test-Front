import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {tap} from 'rxjs/operators';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  message: string;



  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
  }
  doLogIN(): void{
    this.auth.login({email: this.email , password: this.password}).pipe(tap(b => {
      if (!b){
        this.message = '*not proper email or password';
      }
      })
    );
  }
  // forgotPassword(): void{
  //   this.router.navigate(['/forgotpassword']);
  // }

}
