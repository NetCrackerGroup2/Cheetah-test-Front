import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActionResult} from '../../models/action-result/ActionResult';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TestCaseInfoService {

  constructor(private http: HttpClient) {
  }

  getActions(idTestCase: number): Observable<ActionResult[]> {
    const url = `${environment.apiUrl}/api/run-test-case/action?id=${idTestCase}`;
    console.log('sending in :' + url);
    return this.http.get<ActionResult[]>(url);
  }
}

