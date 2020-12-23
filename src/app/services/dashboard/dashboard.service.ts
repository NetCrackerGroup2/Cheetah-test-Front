import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {RecentUser} from '../../models/dashboard/RecentUser';
import {ProjectActivityData} from '../../models/dashboard/ProjectActivityData';
import {UserProject} from '../../models/dashboard/UserProject';
import {PlannedTestCase} from '../../models/dashboard/PlannedTestCase';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getTotalUsers(): Observable<number[]> {
    const url = `${environment.apiUrl}/api/dashboard/admin/count-users`;
    return this.http.get<number[]>(url);
  }

  getProjectPercent(): Observable<number[]> {
    const url = `${environment.apiUrl}/api/dashboard/admin/percent-projects`;
    return this.http.get<number[]>(url);
  }

  getRecentUsers(): Observable<RecentUser[]> {
    const url = `${environment.apiUrl}/api/dashboard/admin/users-activity`;
    return this.http.get<RecentUser[]>(url);
  }

  getAmountOfArchivedProjects(): Observable<number> {
    const url = `${environment.apiUrl}/api/dashboard/admin/archive-projects`;
    return this.http.get<number>(url);
  }

  getTodayProjects(): Observable<number> {
    const url = `${environment.apiUrl}/api/dashboard/lastday-created-projects`;
    return this.http.get<number>(url);
  }

  getPlannedTestCasesForEngineer(userId: number): Observable<PlannedTestCase[]> {
    const url = `${environment.apiUrl}/api/dashboard/engineer/planned-testcases`;
    const p = new HttpParams().set('id', userId + '');

    return this.http.get<PlannedTestCase[]>(url, {params: p});
  }

  getPlannedTestCasesForManager(): Observable<PlannedTestCase[]> {
    const url = `${environment.apiUrl}/api/dashboard/manager/planned-testcases`;
    return this.http.get<PlannedTestCase[]>(url);
  }

  getProjectActivity(): Observable<ProjectActivityData> {
    const url = `${environment.apiUrl}/api/dashboard/admin/projects-activity`;
    return this.http.get<ProjectActivityData>(url);
  }

  getUserProjectsForEngineerBy(userId: number): Observable<UserProject[]> {
    const url = `${environment.apiUrl}/api/dashboard/personal-projects`;
    const p = new HttpParams().set('id', userId + '');
    return this.http.get<UserProject[]>(url, {params: p});
  }

  getUserProjectsForManager(): Observable<UserProject[]> {
    const url = `${environment.apiUrl}/api/dashboard/supp-projects`;
    return this.http.get<UserProject[]>(url);
  }

  getTestCaseStatsByProjectId(projectId: number): Observable<number[]> {
    const url = `${environment.apiUrl}/api/dashboard/testcase-statistic`;
    const p = new HttpParams().set('id', projectId + '');
    return this.http.get<number[]>(url, {params: p});
  }
}
