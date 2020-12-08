import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {TestScenario} from "../../models/test-scenario/test-scenario";
import {TestScenarioCreateDto} from "../../models/test-scenario-create-dto/test-scenario-create-dto";

@Injectable({
  providedIn: 'root'
})
export class TestScenarioService {

  constructor(private http: HttpClient) {
  }


  // TO DO
  getTestScenarios(thePageNumber: number, thePageSize: number): Observable<GetResponseTestScenarios> {
    const url = `${environment.apiUrl}/api/test-scenarios?&title=&size=${thePageSize}&page=${thePageNumber}`;
    return this.http.get<GetResponseTestScenarios>(url);
  }

  searchTestScenarios(thePageNumber: number, thePageSize: number, theKeyword: string): Observable<GetResponseTestScenarios> {
    const url = `${environment.apiUrl}/api/test-scenarios?&title=${theKeyword}&size=${thePageSize}&page=${thePageNumber}`;
    return this.http.get<GetResponseTestScenarios>(url);
  }

  remove(id: number): Observable<any> {
    const url = `${environment.apiUrl}/api/test-scenario/${id}`;
    return this.http.delete<GetResponseTestScenarios>(url);
  }


  createTestScenario(testScenarioCreateDto: TestScenarioCreateDto): Observable<any> {
    const url = `${environment.apiUrl}/api/test-scenarios`;
    return  this.http.post<TestScenarioCreateDto>(url, testScenarioCreateDto);
  }
}

interface GetResponseTestScenarios {
  testScenarios: TestScenario[];
  totaltestScenarios: number;
}
