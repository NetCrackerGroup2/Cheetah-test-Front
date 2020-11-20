import {Component} from '@angular/core';
import {User} from './models/user/user';
import {AuthService} from './services/auth/auth.service';
import {Role} from './models/roles/role';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user: User;
  classApplied = false;

  toggleClass(): void {
    this.classApplied = !this.classApplied;
  }

  constructor(private authenticationService: AuthService,
              private router: Router) {
    this.authenticationService.user.subscribe(
      x => {
        this.user = x;
      }
    );
  }

  get isOut(): boolean {
    return this.router.url.startsWith('/login')
      || this.router.url.startsWith('/forgot-password')
      || this.router.url.startsWith('/reset-password');
  }

  get isAdmin(): boolean {
    return this.user && this.user.role === Role.ADMIN;
  }

  logout(): void {
    this.authenticationService.logout();
  }

}
