import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {UserDto} from '../../models/user/dto/user-dto';
import {Ids} from '../../models/ids/ids';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  search(terms: Observable<string>): Observable<UserDto[]> {

    return terms.pipe(
      debounceTime(150),
      distinctUntilChanged(),
      switchMap(term => this.searchEntries(term)));
  }

  searchEntries(term: string): Observable<UserDto[]> {
    const url = `${environment.apiUrl}/api/user?email=${term}`;
    return this.http.get<UserDto[]>(url);
  }

  getWatchersByProjectId(projectId: number): Observable<UserDto[]> {
    const url = `${environment.apiUrl}/api/user/watchers/${projectId}`;
    return this.http.get<UserDto[]>(url);
  }

  save(projectId: number, watchers: number[]): Observable<any> {
    const url = `${environment.apiUrl}/api/user/watchers/${projectId}`;
    return this.http.put<UserDto[]>(url, new Ids(watchers));
  }
}

interface GetResponseCompounds {
  users: UserDto[];
  totalElements: number;
}
