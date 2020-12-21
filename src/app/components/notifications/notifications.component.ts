import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {WebsocketService} from '../../services/websocket/websocket.service';
import {WS} from '../../services/websocket/websocket.events';
import {map} from 'rxjs/operators';
import {Notification, NotificationStatus, ReadStatus} from '../../models/websocket/notification';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit, OnDestroy {

  notifications$: Observable<Notification[]>;
  oldNotifications$: Observable<Notification[]>;
  newNotifications$: Observable<Notification[]>;
  newNotifications: Notification[];


  constructor(
    private router: Router,
    private websocketService: WebsocketService
  ) {
  }

  ngOnInit(): void {
    this.notifications$ = this.websocketService.on<Notification[]>(WS.ON.NOTIFICATIONS);
    this.newNotifications$ = this.notifications$.pipe(
      map((notifications) => notifications.filter((notification) => ReadStatus.UNREAD === notification.readStatus))
    );
    this.oldNotifications$ = this.notifications$.pipe(
      map((notifications) => notifications.filter((notification) => ReadStatus.READ === notification.readStatus))
    );

    this.newNotifications$.subscribe({
      next: (notifications) => {
        this.newNotifications = notifications;
      }
    });

    this.websocketService.send(WS.SEND.GET_NOTIFICATIONS);
  }

  goToRunDetails(idTestCase: number, htcId: number, projectId: number, notificationStatus: NotificationStatus): void {
    if (notificationStatus === NotificationStatus.IN_PROCESS) {
      this.router.navigate([`test-scenario/${idTestCase}/info`]);
    } else {
      this.router.navigate([`projects/${projectId}/test-cases/${idTestCase}/history/${htcId}`]);
    }

  }

  deleteNotification(id: number): void {
    this.websocketService.send(WS.SEND.DELETE_NOTIFICATION, id);
  }

  ngOnDestroy(): void {
    if (this.newNotifications.length > 0) {
      const ids: number[] = this.newNotifications.map((notification) => notification.id);
      this.websocketService.send(WS.SEND.NOTIFICATIONS_VIEWED, ids);
    }
  }
}
