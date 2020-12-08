import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  postUploadFile(files: FileList): object {
    const fileToUpload = files.item(0);
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    const url = `${environment.apiUrl}/api/edit-user/uploadPhoto`;
    return this.http.post(url, formData);
  }

}
