import {Component, OnInit} from '@angular/core';
import {Notification, NotificationsService} from '../../services/notifications/notifications.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  notifications: Notification[];
  totalElements = 0;
  thePageNumber = 1;
  thePageSize = 5;

  constructor(private notificationsService: NotificationsService, private router: Router) {
    this.getNotifications(1, 5);
  }

  ngOnInit(): void {
  }

  getNotifications(page: number, size: number): void {
    this.notifications = [
      {name: 'ugfasf', testCaseId: 1, projectId: 11},
      {name: 'fafe', testCaseId: 1, projectId: 11},
      {name: 'tagga', testCaseId: 1, projectId: 11},
      {name: 'thwt', testCaseId: 1, projectId: 11},
      {name: 'wryw', testCaseId: 1, projectId: 11}

    ];
    this.totalElements = 20;
    /*this.notificationsService.getNotifications(page, size)
      .pipe(take(1))
      .subscribe(data => {
        this.notifications = data.notifications;
        this.totalElements = data.totalElements;
      });*/
  }

  goToRunDetails(idTestCase: number): void {
    this.router.navigate(['/test-scenario', idTestCase, 'info']);
  }
}
