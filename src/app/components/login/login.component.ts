import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';
import {LoginDto} from '../../models/loginDto/loginDto';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  message: string;
  loading = false;
  submitted = false;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.userValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
  }

  login(): void {
    this.loading = true;

    const user: LoginDto = new LoginDto(this.email, this.password);
    // const user: LoginDto = new LoginDto('abereznikov64@gmail.com', 'pas');
    this.authenticationService.login(user)
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/desktop');
          this.loading = false;
        },
        error: () => {
          this.error = 'Email or password is incorrect';
          this.loading = false;
        }
      });
  }


}
