import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {UserDto} from '../../models/user/dto/user-dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  search(terms: Observable<string>, projectId: number): Observable<UserDto[]> {

    return terms.pipe(
      debounceTime(150),
      distinctUntilChanged(),
      switchMap(term => this.searchEntries(term, projectId)));
  }

  searchEntries(term: string, projectId: number): Observable<UserDto[]> {
    const url = `${environment.apiUrl}/api/user/search/findByName/${projectId}?title=${term}`;
    return this.http.get<UserDto[]>(url);
  }
}

interface GetResponseCompounds {
  users: UserDto[];
  totalElements: number;
}
