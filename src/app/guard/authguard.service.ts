import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['desktop']);  // redirecting to home page
    }
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['login']);   // redirecting back to login
    }
    return this.authService.isLoggedIn();
  }
}
