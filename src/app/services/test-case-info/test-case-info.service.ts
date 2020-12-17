import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {ActionStatus} from '../../models/action-result/ActionStatus';

@Injectable({
  providedIn: 'root'
})
export class TestCaseInfoService {

  constructor(private http: HttpClient) {
  }

  getActions(idTestCase: number): Observable<ActionResultFID[]> {
    const url = `${environment.apiUrl}/api/run-test-case/action?id=${idTestCase}`;
    return this.http.get<ActionResultFID[]>(url);
  }
}
export class ActionResultFID{
  id: number;
  actionType: string;
  status: ActionStatus;
  resultDescription: string;
  screenshotUrl: string;
  element: string;
  argument: string;
}

