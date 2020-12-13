import {Component, DoCheck, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {WebsocketService} from '../../services/websocket/websocket.service';
import {WS} from '../../services/websocket/websocket.events';
import {map} from 'rxjs/operators';
import {ReadStatus} from '../../models/websocket/notification';
import {Notification} from '../../models/websocket/notification';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit, OnDestroy {

  notifications$: Observable<Notification[]>;
  oldNotifications$: Observable<Notification[]>;
  newNotifications$: Observable<Notification[]>;

  constructor(
    private router: Router,
    private websocketService: WebsocketService
  ){}

  ngOnInit(): void {
    this.notifications$ = this.websocketService.on<Notification[]>(WS.ON.NOTIFICATIONS);
    this.newNotifications$ = this.notifications$.pipe(
      map((notifications) => notifications.filter((notification) => ReadStatus.UNREAD === notification.readStatus))
    );
    this.oldNotifications$ = this.notifications$.pipe(
      map((notifications) => notifications.filter((notification) => ReadStatus.READ === notification.readStatus))
    );
    this.websocketService.send(WS.SEND.GET_NOTIFICATIONS);
  }

  goToRunDetails(idTestCase: number): void {
    this.router.navigate(['/test-scenario', idTestCase, 'info']);
  }

  ngOnDestroy(): void {
    if (this.newNotifications$) {
      this.newNotifications$.subscribe({
        next: (notifications) => {
          let newNotifications: Notification[];
          newNotifications = notifications;
          if (newNotifications) {
            const ids: number[] = newNotifications.map((notification) => notification.id);
            this.websocketService.send(WS.SEND.NOTIFICATIONS_VIEWED, ids);
          }
        }
      });
    }
  }
}
