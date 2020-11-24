import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ActionsAndCompoundsService {

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
  }

  getActionsAndCompoundsList(thePageNumber: number, thePageSize: number, libraryId: number):
    Observable<GetResponseActionsAndCompounds> {
    const url = `${environment.apiUrl}/api/library/${libraryId}?size=${thePageSize}&page=${thePageNumber}&title=`;
    return this.http.get<GetResponseActionsAndCompounds>(url);
  }

  searchActionsAndCompoundsPaginate(thePageNumber: number, thePageSize: number, theKeyword: string, libraryId: number):
    Observable<GetResponseActionsAndCompounds> {
    const url = `${environment.apiUrl}/api/library/${libraryId}?size=${thePageSize}&page=${thePageNumber}&title=${theKeyword}`;
    return this.http.get<GetResponseActionsAndCompounds>(url);
  }
}

interface GetResponseActionsAndCompounds {
  list: any[];
  totalElements: number;
}
