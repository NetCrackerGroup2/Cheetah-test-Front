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


function getTestCaseStats(data: number[]): any {
  const status = ['Successful', 'Failed', 'Not started yet'];
  const stats = [];
  for (let i = 0; i < 3; i++) {
    stats.push(
      {
        name: status[i],
        value: data[i]
      }
    );
  }
  return stats;
}

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
  plannedTestCases: PlannedTestCase[] = [];
  totalArchivedProjects = 18;
  recentUsers: RecentUser[];
  projectActivity: ProjectActivityData;


  colorScheme = {
    domain: ['#bf9d76', '#e99450', '#b2854f', '#f2dfa7']
  };
  // testCaseStats = [];
  testCaseStats = [
    {
      "name": "Sucesseful",
      "value": 154
    },
    {
      "name": "Failed",
      "value": 78
    },
    {
      "name": "Not yet started",
      "value": 29
    }
  ];
  testCasesColorScheme = {
    domain: ['#24c215', '#d41313', '#585858']
  };

  single = [
    {
      name: 'Karthikeyan',
      series: [
        {
          name: '2016',
          value: '15000'
        },
        {
          name: '2017',
          value: '20000'
        },
        {
          name: '2018',
          value: '25000'
        },
        {
          name: '2019',
          value: '30000'
        }
      ],
    },
  ];
  totalTodayProjects: number;

  constructor(
    private authenticationService: AuthService,
    private dashboardService: DashboardService,
    private userService: UserService,
    private router: Router
  ) {
    this.user = this.authenticationService.userValue;
    this.userId = 2;
    this.isAdmin = this.user.role === 'ADMIN';
    this.dashboardService.getTotalUsers().subscribe(
      data => this.totalUsers = data
    );
    this.dashboardService.getRecentUsers()
      .subscribe(data => this.recentUsers = data);
    this.dashboardService.getAmountOfArchivedProjects()
      .subscribe(data => this.totalArchivedProjects = data);
    this.dashboardService.getTodayProjects()
      .subscribe(data => this.totalTodayProjects = data);
    this.dashboardService.getProjectActivity().subscribe(
      data => this.projectActivity = data
    );
    this.dashboardService.getUserProjectsBy(2).subscribe(
      data => this.userProjects = data
    );
    if (this.user.role === 'ENGINEER') {
      this.dashboardService.getPlannedTestCasesForEngineer(this.userId)
        .subscribe(data => this.plannedTestCases = data);
    }
    else if (this.user.role === 'MANAGER') {
      this.dashboardService.getPlannedTestCasesForManager()
        .subscribe(data => this.plannedTestCases = data);
    }
    this.dashboardService.getTestCaseStatsByProjectId(1)
      .subscribe(data => this.testCaseStats = getTestCaseStats(data));
  }

  ngOnInit(): void {

  }



  goToProject(projectId: number): void {
    this.router.navigate(['projects', projectId, 'test-cases']);
  }
}
