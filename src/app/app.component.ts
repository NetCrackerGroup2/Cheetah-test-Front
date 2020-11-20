import {Component, OnInit} from '@angular/core';
import {User} from './models/user/user';
import {AuthService} from './services/auth/auth.service';
import {Role} from './models/roles/role';
import {Router} from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  user: User;
  wasClicked = false;

  ngOnInit(): void {
    $('#menu-toggle').click(e => {
      e.preventDefault();
      $('#wrapper').toggleClass('toggled');
    });
  }
  constructor(private authenticationService: AuthService,
              private router: Router) {
    this.authenticationService.user.subscribe(
      x => {
        this.user = x;
      }
    );
  }

  onClick(): void {
    this.wasClicked = !this.wasClicked;
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
