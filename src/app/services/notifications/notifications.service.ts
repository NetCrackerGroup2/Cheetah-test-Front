import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private http: HttpClient) {
  }

  getNotifications(page: number, size: number): Observable<GetResponseNotifications> {
    const url = `${environment.apiUrl}/api/notifications?page=${page}&size=${size}`;
    return this.http.get<GetResponseNotifications>(url);
  }
}

export class GetResponseNotifications {
  notifications: Notification[];
  totalElements: number;
}

export class Notification {
  name: string;
  testCaseId: number;
  projectId: number;
}
