import {Component, OnDestroy} from '@angular/core';
import {User} from './models/user/user';
import {AuthService} from './services/auth/auth.service';
import {Role} from './models/roles/role';
import {Router} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {WebsocketService} from './services/websocket/websocket.service';
import {WS} from './services/websocket/websocket.events';
import {Notification, ReadStatus} from './models/websocket/notification';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy{
  user: User;
  opened = true;
  authenticationServiceSubscription: Subscription;
  private notifications$: Observable<Notification[]>;
  private newNotificationsCount$: Observable<number>;

  constructor(private authenticationService: AuthService,
              private router: Router,
              private websocketService: WebsocketService
  ) {
    this.authenticationServiceSubscription = this.authenticationService.user.subscribe(
      x => {
        this.user = x;
      }
    );
    this.websocketService.status.subscribe(
      {next: () => {
          this.notifications$ = this.websocketService.on<Notification[]>(WS.ON.NOTIFICATIONS);
          this.newNotificationsCount$ = this.notifications$.pipe(
            map(
              (notifications) => notifications.filter((notification) => notification.readStatus === ReadStatus.UNREAD).length
            )
          );
          this.websocketService.send('get-notifications');
        }
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

  toggleSidebar(): void {
    this.opened = !this.opened;
  }

  ngOnDestroy(): void {
    if (this.authenticationServiceSubscription) {
      this.authenticationServiceSubscription.unsubscribe();
    }
  }

}
