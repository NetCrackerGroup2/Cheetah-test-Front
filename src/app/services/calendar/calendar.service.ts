import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {DatePostDto} from "../../models/date/date-post-dto";
import {DateGetDto} from "../../models/date/date-get-dto";
import {TestCaseDate} from "../../models/date/test-case-date";
import {Action} from "../../models/action/action";
import {debounceTime, distinctUntilChanged, switchMap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  constructor(private http: HttpClient) {
  }

  getDates(): Observable<TestCaseDate[]> {
    const url = `${environment.apiUrl}/api/schedule-test-case`;
    return this.http.get<TestCaseDate[]>(url);
  }

  search(terms: Observable<string>): Observable<TestCaseDate[]> {
    return terms.pipe(
      debounceTime(150),
      distinctUntilChanged(),
      switchMap(term => this.searchEntries(term)));
  }

  searchEntries(term: any): Observable<TestCaseDate[]> {
    console.log(term);
    const url = `${environment.apiUrl}/api/schedule-test-case/test-cases?title=${term}`;
    return this.http.get<TestCaseDate[]>(url);
  }

  deleteDates(id: number): Observable<any> {
    const url = `${environment.apiUrl}/api/schedule-test-case/${id}`;
    return this.http.delete<DatePostDto>(url);
  }
  createDates(date: DatePostDto): Observable<any> {
    const url = `${environment.apiUrl}/api/schedule-test-case`;
    return this.http.post<DatePostDto>(url, date);
  }
  editEvent(date: DatePostDto): Observable<any>{
    const url = `${environment.apiUrl}/api/schedule-test-case`;
    return this.http.put<any>(url, date);
  }
}

