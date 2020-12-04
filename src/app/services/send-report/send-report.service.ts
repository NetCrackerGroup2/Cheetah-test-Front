import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {CompoundDtoWithActions} from '../../models/compound-actions-dto/compound-dto-with-actions';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SendReportService {

  constructor(private http: HttpClient) {
  }

  sendReports(emails: string[], idTestCase: number): Observable<any> {
    //todo
    const url = `${environment.apiUrl}/api/${idTestCase}/send-report`;
    return this.http.post<any>(url, emails);
  }
}

export interface Emails {
  emails: string[];
}
