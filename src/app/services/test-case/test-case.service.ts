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

  getTestCases(projectId: number, pageNum: number, pageSize: number): Observable<GetResponseTestCases> {
    const url = `${environment.apiUrl}/api/test-cases/${projectId}?page=${pageNum}&size=${pageSize}`;
    return this.http.get<GetResponseTestCases>(url);
  }

  findTestCaseByTitle(projectId: number, pageNum: number, pageSize: number, keyword: string): Observable<GetResponseTestCases> {
    const url = `${environment.apiUrl}/api/test-cases/search/findByTitle/${projectId}?page=${pageNum}&size=${pageSize}&keyword=${keyword}`;
    return this.http.get<GetResponseTestCases>(url);
  }

  updateTestCase(testCase: TestCase): Observable<any> {
    const url = `${environment.apiUrl}/api/test-cases/${testCase.id}`;
    return this.http.put<any>(url, testCase)
      .pipe(
        catchError(err => {
            return of(err);
        })
      );
  }

  deactivateTestCase(id: number): Observable<any> {
    const url = `${environment.apiUrl}/api/test-cases/${id}`;
    return this.http.delete<any>(url, {});
  }
}

interface GetResponseTestCases {
  testCaseList: TestCase[];
  totalElements: number;
}
