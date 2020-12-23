import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from './models/user/user';
import {AuthService} from './services/auth/auth.service';
import {Role} from './models/roles/role';
import {Router} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {WebsocketService} from './services/websocket/websocket.service';
import {WS} from './services/websocket/websocket.events';
import {Notification, ReadStatus} from './models/websocket/notification';
import {map} from 'rxjs/operators';
import {ProfileService} from './services/profile/profile.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  user: User;
  opened = true;
  authenticationServiceSubscription: Subscription;
  url: string;

  private notifications$: Observable<Notification[]>;
  private newNotificationsCount$: Observable<number>;

  constructor(private authenticationService: AuthService,
              private router: Router,
              private websocketService: WebsocketService,
              private profileService: ProfileService) {
    this.authenticationServiceSubscription = this.authenticationService.user.subscribe(
      x => {
        this.user = x;
      }
    );
    if (this.authenticationService.userValue !== null) {
      profileService.getPhotoURL(this.authenticationService.userValue.email).subscribe(
        (elem) => this.url = elem ? elem : 'assets/sidebar_images/img_example.jpg');
    }
  }

  ngOnInit(): void {
    this.notifications$ = this.websocketService.on<Notification[]>(WS.ON.NOTIFICATIONS);
    this.newNotificationsCount$ = this.notifications$.pipe(
      map(
        (notifications) => notifications.filter((notification) => notification.readStatus === ReadStatus.UNREAD).length
      )
    );
    this.websocketService.send('get-notifications');
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
  loadPhoto(): void {
    this.profileService.getPhotoURL(this.authenticationService.userValue.email).subscribe(
      (elem) => this.url = elem ? elem : 'assets/sidebar_images/img_example.jpg');
  }
}
