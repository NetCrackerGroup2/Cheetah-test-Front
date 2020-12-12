import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {DatePostDto} from "../../models/date/date-post-dto";
import {DateGetDto} from "../../models/date/date-get-dto";

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
  createDates(date: DatePostDto): Observable<any> {
    const url = `${environment.apiUrl}/api/schedule-test-case`;
    return this.http.post<DatePostDto>(url, date);
  }
}

interface GetResponseDates {
  dates: DateGetDto[];
}
