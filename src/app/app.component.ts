import {Component, OnDestroy} from '@angular/core';
import {User} from './models/user/user';
import {AuthService} from './services/auth/auth.service';
import {Role} from './models/roles/role';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {ProfileService} from './services/profile/profile.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy{
  user: User;
  opened = true;
  authenticationServiceSubscription: Subscription;
  url: string;

  constructor(private authenticationService: AuthService,
              private router: Router,
              private profileService: ProfileService) {
    this.authenticationServiceSubscription = this.authenticationService.user.subscribe(
      x => {
        this.user = x;
      }
    );
    profileService.getPhotoURL(this.authenticationService.userValue.email).subscribe(
      (elem) => this.url = elem ? elem : 'assets/sidebar_images/img_example.jpg');
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

  toggleSidebar(): void {
    this.opened = !this.opened;
  }

  ngOnDestroy(): void {
    if (this.authenticationServiceSubscription) {
      this.authenticationServiceSubscription.unsubscribe();
    }
  }

  setUrl(event: any): void{
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (elem: any) => {
        this.url = elem.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }
}
