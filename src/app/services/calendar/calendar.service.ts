import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {DateDto} from "../../models/date/date-dto";

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  constructor(private http: HttpClient) {
  }

  getDates(): Observable<GetResponseDates> {
    const url = `${environment.apiUrl}/api/schedule-test-case`;
    return this.http.get<GetResponseDates>(url);
  }

  deleteDates(id: number): Observable<any> {
    const url = `${environment.apiUrl}/api/schedule-test-case/${id}`;
    return this.http.delete<GetResponseDates>(url);
  }
  createDates(date: DateDto): Observable<any> {
    const url = `${environment.apiUrl}/api/schedule-test-case`;
    return this.http.post<DateDto>(url, date);
  }
}

interface GetResponseDates {
  dates: DateDto[];
}
