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

  save(testCase: TestCase, isEdit: boolean, id: number): Observable<any> {
    const url = `${environment.apiUrl}/api/test-cases`;


    if (isEdit) {
      return this.http.put<TestCase>(`${url}/${id}`, testCase)
        .pipe(
          catchError(error => {
            return of(error);
          })
        );
    } else {
      return this.http.post<TestCase>(url, testCase)
        .pipe(
          catchError(error => {
            return of(error);
          })
        );
    }

  }
}

interface GetResponseTestCases {
  testCaseList: TestCase[];
  totalElements: number;
}
