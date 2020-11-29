import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {TestCase} from '../../models/test-case/test-case';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TestCaseService {

  constructor(private http: HttpClient) {
  }

  create(testCase: TestCase): Observable<any> {
    const url = `${environment.apiUrl}/api/test-cases`;
    return this.http.post<TestCase>(url, testCase)
      .pipe(
        map(data => {
          return data;
        }),
        catchError(error => {
          return of (error);
        })
      );
  }
}

interface GetResponseTestCases {
  testCaseList: TestCase[];
  totalElements: number;
}
