import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  postUploadFile(file: File, email: string): object {
    const formData = new FormData();
    formData.append('file', file, file.name);
    formData.append('email', email);
    const url = `${environment.apiUrl}/api/user/uploadUserPhoto`;
    return this.http.post<any>(url, formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }

  getPhotoURL(email: string): Observable<string> {
    const url = `${environment.apiUrl}/api/user/url-user-photo?email=${email}`;
    return this.http.get(url, { responseType: 'text' });
  }

}
