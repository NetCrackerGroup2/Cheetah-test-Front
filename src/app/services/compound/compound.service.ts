import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Compound} from '../../models/compound/compound';
import {debounceTime, distinctUntilChanged, switchMap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CompoundService {

  constructor(private http: HttpClient) {
  }

  getCompounds(thePageNumber: number, thePageSize: number): Observable<GetResponseCompounds> {
    const url = `${environment.apiUrl}/api/library?&title=&size=${thePageSize}&page=${thePageNumber}`;
    return this.http.get<GetResponseCompounds>(url);
  }

  searchCompounds(thePageNumber: number, thePageSize: number, theKeyword: string): Observable<GetResponseCompounds> {
    const url = `${environment.apiUrl}/api/library?&title=${theKeyword}&size=${thePageSize}&page=${thePageNumber}`;
    return this.http.get<GetResponseCompounds>(url);
  }

  search(terms: Observable<string>): Observable<Compound[]> {
    return terms.pipe(
      debounceTime(150),
      distinctUntilChanged(),
      switchMap(term => this.searchEntries(term)));
  }

  searchEntries(term: any): Observable<Compound[]> {
    const url = `${environment.apiUrl}/api/library/all?title=${term}`;
    return this.http.get<Compound[]>(url);
  }

  remove(id: number): Observable<any> {
    const url = `${environment.apiUrl}/api/library/${id}`;
    return this.http.delete<GetResponseCompounds>(url);
  }
}

interface GetResponseCompounds {
  compounds: Compound[];
  totalCompounds: number;
}
