import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../../models/user/user';
import {environment} from '../../../environments/environment';
import {Observable, Subscription} from 'rxjs';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  UserOnView: User;

  constructor(private http: HttpClient) {
  }

  getUser(pageSize: number, pageNum: number): Observable<GetUser> {
    const url = `${environment.apiUrl}/api/user/profiles?size=${pageSize}&page=${pageNum}`;
    return this.http.get<GetUser>(url);
  }
  search(terms: Observable<string>): Observable<User[]> {
    return terms.pipe(
      debounceTime(150),
      distinctUntilChanged(),
      switchMap(term => this.searchUserByEmail(term)));
  }
  searchUserByEmail(email: string): Observable<User[]> {
    const url = `${environment.apiUrl}/api/user?email=${email}`;
    return this.http.get<User[]>(url);
  }

  getSearchUser(name: string, email: string, role: string, pageSize: number,
                pageNum: number): Observable<GetUser> {
    const url = `${environment.apiUrl}/api/user/search-profiles?name=${name}&email=${email}&role=${role}&size=${pageSize}&page=${pageNum}`;
    return this.http.get<GetUser>(url);
  }

  deactivateUser(email: string): object {
    const url = `${environment.apiUrl}/api/user/deactivate`;
    return this.http.post(url, email).subscribe(
      () => {
        // console.log('POST call successful value returned in body');
      },
      () => {
        // console.log('POST call in error');
      },
      () => {
        // console.log('The POST observable is now completed.');
      });
  }

  editUser(newName: string, newEmail: string, newRole: string,
           prevEmail: string): Subscription {
    const url = `${environment.apiUrl}/api/user/edit-user`;
    const nm = {
      name: newName,
      email: newEmail,
      role: newRole
    };
    const sendData = {
      user: nm,
      previousEmail: prevEmail
    };
    const options = {headers: {'Content-Type': 'application/json'}};
    return this.http.post(url, JSON.stringify(sendData), options).subscribe(
      (t: string) => JSON.stringify(t));
  }
}

export interface GetUser {
  users: User[];
  totalElements: number;
}
