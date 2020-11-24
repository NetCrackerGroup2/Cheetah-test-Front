import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Project} from '../../models/project/project';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {AuthService} from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {


  constructor(private http: HttpClient) {
  }

  getProjectList(thePageNumber: number, thePageSize: number): Observable<GetResponseProjects> {


    const url = `${environment.apiUrl}/api/projects?size=${thePageSize}&page=${thePageNumber}&title=`;

    return this.http.get<GetResponseProjects>(url);
  }

  searchProductsPaginate(thePageNumber: number, thePageSize: number, theKeyword: string): Observable<GetResponseProjects> {
    const url = `${environment.apiUrl}/api/projects?size=${thePageSize}&page=${thePageNumber}&title=${theKeyword}`;
    return this.http.get<GetResponseProjects>(url);
  }

  archiveProductsPaginate(thePageNumber: number, thePageSize: number, theStatus: string): Observable<GetResponseProjects> {
    const url = `${environment.apiUrl}/api/projects?size=${thePageSize}&page=${thePageNumber}&status=${theStatus}`;
    return this.http.get<GetResponseProjects>(url);
  }

  archiveProject(theProjectId: number): Observable<GetResponseProjects>{
    const url = `${environment.apiUrl}/api/project/${theProjectId}/archive`;
    return this.http.get<GetResponseProjects>(url);
  }

  openProjectToEdit(theProjectId: number): Observable<GetResponseProjects>{
    const url = `${environment.apiUrl}/api/project/${theProjectId}`;
    return this.http.get<GetResponseProjects>(url);
  }
}

interface GetResponseProjects {
  list: Project[];
  totalElements: string;
}

