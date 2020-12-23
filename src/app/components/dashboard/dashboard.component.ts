import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user/user';
import {AuthService} from '../../services/auth/auth.service';
import {RecentUser} from '../../models/dashboard/RecentUser';
import {UserProject} from '../../models/dashboard/UserProject';
import {Router} from '@angular/router';
import {DashboardService} from '../../services/dashboard/dashboard.service';
import {ProjectActivityData} from '../../models/dashboard/ProjectActivityData';
import {UserService} from '../../services/user/user.service';
import {PlannedTestCase} from '../../models/dashboard/PlannedTestCase';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: User;
  userId: number;
  isAdmin = false;
  totalUsers: number[] = [];
  userProjects: UserProject[] = [];
  totalTestCases: number;
  plannedTestCases: PlannedTestCase[] = [];
  totalArchivedProjects: number;
  recentUsers: RecentUser[];
  colorScheme = {
    domain: ['#bf9d76', '#e99450', '#b2854f', '#f2dfa7']
  };
  selectProjectId: number;
  selectedProject: UserProject;
  testCaseStats = [];
  testCasesColorScheme = {
    domain: ['#24c215', '#d41313', '#585858']
  };
  projectActivity = [];
  totalTodayProjects: number;
  projectPercent: number;

  constructor(
    private authenticationService: AuthService,
    private dashboardService: DashboardService,
    private userService: UserService,
    private router: Router
  ) {
    this.user = this.authenticationService.userValue;
    this.isAdmin = this.user.role === 'ADMIN';
    this.dashboardService.getTotalUsers().subscribe(
      data => this.totalUsers = data
    );
    this.dashboardService.getProjectPercent().subscribe(
      data => this.projectPercent = Math.round(data[1] / data[0] * 100) / 100
    );
    this.dashboardService.getRecentUsers()
      .subscribe(data => this.recentUsers = data);
    this.dashboardService.getAmountOfArchivedProjects()
      .subscribe(data => this.totalArchivedProjects = data);
    this.dashboardService.getTodayProjects()
      .subscribe(data => this.totalTodayProjects = data);
    this.dashboardService.getProjectActivity().subscribe(
      data => {
        const s = data.series;
        this.projectActivity = [
          {
            name: 'Projects',
            series: s
          }
        ];
      }
    );

    this.userService.searchEntries(this.user.email).subscribe(
      data => {
        this.userId = data[0].id;
        if (this.user.role === 'ENGINEER') {
          this.dashboardService.getUserProjectsForEngineerBy(this.userId).subscribe(
            d => {
              this.userProjects = d;
              this.selectedProject = d[0];
              this.selectProjectId = this.selectedProject.id;
              this.dashboardService.getTestCaseStatsByProjectId(this.userProjects[0].id)
                .subscribe(p => {
                  this.testCaseStats = [
                    {name: 'Successful', value: p[0]},
                    {name: 'Failed', value: p[1]},
                    {name: 'Not started yet', value: p[2]}
                  ];
                  this.totalTestCases = p[3];
                });
            }
          );
          this.dashboardService.getPlannedTestCasesForEngineer(this.userId)
            .subscribe(v => this.plannedTestCases = v);
        }

        else if (this.user.role === 'MANAGER' || this.isAdmin) {
          this.dashboardService.getUserProjectsForManager().subscribe(
            d => {
              this.userProjects = d;
              this.selectedProject = d[0];
              this.selectProjectId = this.selectedProject.id;
              this.dashboardService.getTestCaseStatsByProjectId(this.userProjects[0].id)
                .subscribe(p => {
                  this.testCaseStats = [
                    {name: 'Successful', value: p[0]},
                    {name: 'Failed', value: p[1]},
                    {name: 'Not started yet', value: p[2]}
                  ];
                  this.totalTestCases = p[3];
                });
            }
          );
          this.dashboardService.getPlannedTestCasesForManager()
            .subscribe(z => this.plannedTestCases = z);
        }
      }
    );
  }

  ngOnInit(): void {

  }

  goToProject(projectId: number): void {
    this.router.navigate(['projects', projectId, 'test-cases']);
  }

  selectTestCaseStats(projectId: number): void {

  }

  onUserProjectSelected(projectId: number): void {
    this.dashboardService.getTestCaseStatsByProjectId(projectId).subscribe(
      p => {
        this.testCaseStats = [
          {name: 'Successful', value: p[0]},
          {name: 'Failed', value: p[1]},
          {name: 'Not started yet', value: p[2]}
        ];
      });
  }
}
