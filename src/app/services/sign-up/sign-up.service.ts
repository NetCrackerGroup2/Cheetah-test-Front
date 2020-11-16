import {Injectable} from '@angular/core';
import {UserRegistration} from '../../common/userRegistration/userRegistration';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {
  private u: UserRegistration;

  constructor(private http: HttpClient) {
    this.u = new UserRegistration();
  }

  get user(): UserRegistration {
    return this.u;
  }

  set user(value: UserRegistration) {
    this.u = value;
  }

  postRegisteredUser(): Observable<any> {

    console.log(this.user);
    return this.http.post<any>('http://localhost:8080/api/register', this.user);
  }
}
