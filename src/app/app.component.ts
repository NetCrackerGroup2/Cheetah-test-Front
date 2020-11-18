import {Component} from '@angular/core';
import {User} from './models/user/user';
import {AuthService} from './services/auth/auth.service';
import {Role} from './models/roles/role';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user: User;

  constructor(private authenticationService: AuthService,
              private router: Router) {
    this.authenticationService.user.subscribe(x => this.user = x);
  }

  get isAdmin(): boolean {
    return this.user && this.user.role === Role.ADMIN;
  }

  get isOut(): boolean {
    console.log(this.router.url);
    return this.router.url.startsWith('/login')
      || this.router.url.startsWith('/forget-password')
      || this.router.url.startsWith('/reset-password');
  }

  logout(): void {
    this.authenticationService.logout();
  }
}
