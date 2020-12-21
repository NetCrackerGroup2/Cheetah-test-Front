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
  currentUserProject: UserProject;
  plannedTestCases: PlannedTestCase[] = [];
  totalArchivedProjects: number;
  recentUsers: RecentUser[];
  projectActivity: ProjectActivityData;
  colorScheme = {
    domain: ['#bf9d76', '#e99450', '#b2854f', '#f2dfa7']
  };
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
      name: 'Total projects',
      series: [
        {
          name: '19.12.20',
          value: '2'
        },
        {
          name: '19.12.20',
          value: '5'
        },
        {
          name: '20.12.20',
          value: '4'
        },
        {
          name: '21.12.20',
          value: '8'
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
    this.userId = 2; // TODO
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
    // this.dashboardService.getProjectActivity().subscribe(
    //   data => this.projectActivity = data
    // );

    this.currentUserProject = new UserProject();
    this.dashboardService.getUserProjectsBy(this.userId).subscribe(
      data => {
        this.userProjects = data;
        this.currentUserProject.title = data[0].title;
        this.currentUserProject.id = data[0].id;
        this.currentUserProject.userStatus = data[0].userStatus;
      }
    );

    console.log(this.currentUserProject);
    if (this.user.role === 'ENGINEER') {
      this.dashboardService.getPlannedTestCasesForEngineer(this.userId)
        .subscribe(data => this.plannedTestCases = data);
    }

    else if (this.user.role === 'MANAGER') {
      this.dashboardService.getPlannedTestCasesForManager()
        .subscribe(data => this.plannedTestCases = data);
    }

    // TODO
    this.dashboardService.getTestCaseStatsByProjectId(1)
      .subscribe(data => this.testCaseStats = getTestCaseStats(data));
  }

  ngOnInit(): void {

  }

  goToProject(projectId: number): void {
    this.router.navigate(['projects', projectId, 'test-cases']);
  }
}
