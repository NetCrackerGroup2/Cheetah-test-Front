import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {environment} from "../../../environments/environment";
import {TestScenario} from "../../models/test-scenario/test-scenario";
import {TestScenarioCreateDto} from "../../models/test-scenario-create-dto/test-scenario-create-dto";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TestScenarioService {

  constructor(private http: HttpClient) {
  }

  getTestScenarios(thePageNumber: number, thePageSize: number, theTestCaseId: number): Observable<GetResponseTestScenarios> {
    const url = `${environment.apiUrl}/api/test-scenarios/${theTestCaseId}/all?size=${thePageSize}&page=${thePageNumber}`;
    return this.http.get<GetResponseTestScenarios>(url);
  }


  searchTestScenarios(thePageNumber: number, thePageSize: number, theTestCaseId: number, theKeyword: string): Observable<GetResponseTestScenarios> {
    const url = `${environment.apiUrl}/api/test-scenarios/${theTestCaseId}?title=${theKeyword}&size=${thePageSize}&page=${thePageNumber}`;
    return this.http.get<GetResponseTestScenarios>(url);
  }

  remove(id: number): Observable<any> {
    const url = `${environment.apiUrl}/api/test-scenarios?id=${id}`;
    return this.http.delete<any>(url);
  }

  createTestScenario(testScenarioCreateDto: TestScenarioCreateDto): Observable<any> {
    const url = `${environment.apiUrl}/api/test-scenarios`;
    return  this.http.post<TestScenarioCreateDto>(url, testScenarioCreateDto)
    .pipe(
      catchError(err => of(err))
    );
  }
}

interface GetResponseTestScenarios {
  testScenarios: TestScenario[];
  totalElements: number;
}
