import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user/user';
import {AuthService} from '../../services/auth/auth.service';
import {RecentUser} from '../../models/dashboard/RecentUser';


import * as $ from 'jquery';
import {UserProject} from '../../models/dashboard/UserProject';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: User;
  totalUsers: number[] = [2, 10, 78];
  // userProject: UserProject[];
  plannedTestCases: [];
  totalArchivedProjects = 18;
  recentUsers: RecentUser[] = [
    new RecentUser(
      'https://maskicharly.nethouse.ru/static/img/0000/0000/8083/8083665.kmx1pufmfy.jpg?1',
      'Danil Solovjov',
      'Engineer',
      '21:22'
    ),
    new RecentUser(
      'https://maskicharly.nethouse.ru/static/img/0000/0000/8083/8083665.kmx1pufmfy.jpg?1',
      'Dima Gorovenko',
      'Admin',
      '20:00'
    ),
    new RecentUser(
      'https://maskicharly.nethouse.ru/static/img/0000/0000/8083/8083665.kmx1pufmfy.jpg?1',
      'Kate Babanina',
      'Engineer',
      '17:20'
    ),
    new RecentUser(
      'https://maskicharly.nethouse.ru/static/img/0000/0000/8083/8083665.kmx1pufmfy.jpg?1',
      'Alex Bereznikov',
      'Engineer',
      '13:11'
    ),
    new RecentUser(
      'https://maskicharly.nethouse.ru/static/img/0000/0000/8083/8083665.kmx1pufmfy.jpg?1',
      'Dima Rozhko',
      'Engineer',
      '14:44'
    )

  ];
  userProjects: UserProject[] = [
    new UserProject(2, 'HotlineProject', 'Developer'),
    new UserProject(3, 'Rozetka Project', 'Watcher'),
    new UserProject(5, 'Github Project', 'Watcher'),
    new UserProject(7, 'Olx Project', 'Developer'),
    new UserProject(8, 'Ebay Project', 'Watcher'),
    new UserProject(9, 'Juno Project', 'Watcher')
  ];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Population';
  colorScheme = {
    domain: ['#bf9d76', '#e99450', '#b2854f', '#f2dfa7']
  };

  view: any[] = [800, 200];
  testCaseStats = [
    {
      "name": "Sucesseful",
      "value": 125
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

  autoScale = true;
  amountOfProjects = [
    {
      "name": "Total projects",
      "series": [
        {
          "value": 3,
          "name": "2020-12-20T14:38:08.093Z"
        },
        {
          "value": 6,
          "name": "2020-12-19T14:38:08.093Z"
        },
        {
          "value": 2,
          "name": "2020-12-18T14:38:08.093Z"
        },
        {
          "value": 7,
          "name": "2020-12-13T14:38:08.093Z"
        },
      ]
    },
  ];
  totalTodayProjects = 3;

  constructor(
    private authenticationService: AuthService,
    private router: Router
  ) {
    this.user = this.authenticationService.userValue;
  }

  ngOnInit(): void {

  }

  goToProject(projectId: number): void {
    this.router.navigate(['projects', projectId, 'test-cases']);
  }
}
