import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActionResult} from '../../models/action-result/ActionResult';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestCaseInfoService {

  constructor(private http: HttpClient) {
  }

  getActions(idTestCase: number): Observable<ActionResult[]> {
    const url = `http://localhost:8080/api/run-test-case/action?id=${idTestCase}`;
    return this.http.get<ActionResult[]>(url);
  }
}

