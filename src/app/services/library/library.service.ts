import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Library} from '../../models/library/library';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  libraryOnEdit: Library;
  libraryOnView: Library;

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

  saveLibrary(library: Library): Observable<any> {
    const url = `${environment.apiUrl}/api/library/${library.id}/edit`;
    console.log(library);
    return this.http.put(url, library);
  }

  createLibrary(library: Library): Observable<any> {
    const url = `${environment.apiUrl}/api/create-library`;
    console.log(library);
    return this.http.post(url, library);
  }
}

interface GetResponseLibraries {
  list: Library[];
  totalElements: number;
}

