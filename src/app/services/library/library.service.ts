import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Library} from '../../models/library/library';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {AuthService} from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {


  constructor(private http: HttpClient) {
  }

  getLibraryList(thePageNumber: number, thePageSize: number): Observable<GetResponseLibraries> {


    const url = `${environment.apiUrl}/api/libraries?size=${thePageSize}&page=${thePageNumber}&title=`;

    return this.http.get<GetResponseLibraries>(url);
  }

  searchProductsPaginate(thePageNumber: number, thePageSize: number, theKeyword: string): Observable<GetResponseLibraries> {
    const url = `${environment.apiUrl}/api/libraries?size=${thePageSize}&page=${thePageNumber}&title=${theKeyword}`;
    return this.http.get<GetResponseLibraries>(url);
  }
}

interface GetResponseLibraries {
  list: Library[];
  totalElements: string;
}

