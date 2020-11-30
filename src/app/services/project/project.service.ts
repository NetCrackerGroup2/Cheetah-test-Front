import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Project} from '../../models/project/entity/project';
import {ProjectDtoWithUserIds} from '../../models/project/project-dto-with-user-ids/project-dto-with-user-ids';
import {UserDto} from '../../models/user/dto/user-dto';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) {
  }

  search(terms: Observable<string>): Observable<UserDto[]> {
    return terms.pipe(
      debounceTime(150),
      distinctUntilChanged(),
      switchMap(term => this.searchEntries(term)));
  }

  searchEntries(term: any): Observable<UserDto[]> {
    const url = `${environment.apiUrl}/api/user/search/findByName?title=${term}&page=1&size=10`;
    return this.http.get<UserDto[]>(url);
  }

  create(projectDtoWithUserIds: ProjectDtoWithUserIds): Observable<any> {
    const url = `${environment.apiUrl}/api/project-management/projects`;
    return this.http.post<any>(url, projectDtoWithUserIds)
      .pipe(
        catchError(err => of(err))
      );
  }

  getProjects(thePageNumber: number, thePageSize: number): Observable<GetResponseProjects> {
    const url = `${environment.apiUrl}/api/project-management/projects/active?page=${thePageNumber}&size=${thePageSize}`;
    return this.http.get<GetResponseProjects>(url);
  }

  findProjectsByTitle(thePageNumber: number, thePageSize: number, title: string): Observable<GetResponseProjects> {
    const url = `${environment.apiUrl}/api/project-management/projects/search/findActiveByTitle?page=${thePageNumber}&size=${thePageSize}&title=${title}`;
    return this.http.get<GetResponseProjects>(url);
  }
}

interface GetResponseProjects {
  projects: Project[];
  totalElements: number;
}
