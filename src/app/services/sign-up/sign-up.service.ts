import { Injectable } from '@angular/core';
import {User} from './User';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {
  private u: User;

  constructor(private http: HttpClient) {
    this.u = new User();
  }

  get user(): User {
    return this.u;
  }

  set user(value: User) {
    this.u = value;
  }

  postRegisteredUser(): Observable<any> {
    const newUser = JSON.stringify(this.user);
    console.log(newUser);
    return this.http.post('http://localhost:8080/api/register', newUser);
  }
}
