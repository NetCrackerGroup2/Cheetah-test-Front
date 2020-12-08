import { Injectable } from '@angular/core';
import {HistoryTestCase} from '../../models/history-test-case/history-test-case';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor(private http: HttpClient) { }

  getHistoryTestCase(pageSize: number,
                     pageNum: number): Observable<GetHistoryTestCase> {
    const url = `${environment.apiUrl}/api/history/test-case?size=${pageSize}&page=${pageNum}`;
    return this.http.get<GetHistoryTestCase>(url);
  }
}

export interface GetHistoryTestCase {
  historyTestCases: HistoryTestCase[];
  totalTestCases: number;
}
