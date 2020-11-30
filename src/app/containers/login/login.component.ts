import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';
import {tap} from 'rxjs/operators';
import {User} from '../../common/user/user';
import {JwtToken} from '../../common/jwtToken/jwt-token';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  message: string;
  token: string;

  constructor(private router: Router, private auth: AuthService) {
  }

  ngOnInit(): void {
  }

  doLogIn(): void {
    const user: User = new User(this.email, this.password);
    this.auth.login(user)
      .subscribe(data => this.token = data.accessToken);
    this.auth.messageSubject$.subscribe(message => {
      this.message = message;
    });
  }


}
