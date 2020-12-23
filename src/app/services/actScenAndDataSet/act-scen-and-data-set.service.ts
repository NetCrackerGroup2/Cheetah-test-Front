import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {environment} from "../../../environments/environment";
import {ActScenario} from "../../models/act-scenario/act-scenario";
import {Parameter} from "../../models/parameter/parameter";
import {catchError, debounceTime, distinctUntilChanged, switchMap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ActScenAndDataSetService {

  constructor(private http: HttpClient) { }

  getAllActScenByIdTestScen(idTestScenario: number): Observable<ActScenario[]> {
    const url = `${environment.apiUrl}/api/test-scenarios/${idTestScenario}/general`;
    return this.http.get<ActScenario[]>(url);
  }

  search(terms: Observable<string>, id: number): Observable<Parameter[]> {

    return terms.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(term => this.searchEntries(term, id)));
  }

  searchEntries(term: any, id: number): Observable<Parameter[]> {
    const url = `${environment.apiUrl}/api/parameters/all-params/value=${term}?idTestCase=${id}`;
    return this.http.get<Parameter[]>(url);
  }

  getAllParamByIdTestCase(theTestCaseId: number): Observable<Parameter[]> {
    const url = `${environment.apiUrl}/api/parameters/all/${theTestCaseId}/test-case`;
    return  this.http.get<Parameter[]>(url);
  }

  save(actScenarios: ActScenario[], parameters: Parameter[]): Observable<any>{
    const url = `${environment.apiUrl}/api/test-scenarios/act-scenarios`;

    for (let i = 0; i < actScenarios.length; i++) {
      actScenarios[i].parameterId = parameters[i].id;
      actScenarios[i].parameterType = parameters[i].type;
      actScenarios[i].parameterValue = parameters[i].value;
    }
    return this.http.put<any>(url, actScenarios).pipe(
      catchError(err => of(err))
    );
  }

}
