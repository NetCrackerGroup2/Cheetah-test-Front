import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth/auth.service';
import {GetHistoryTestCase, HistoryService} from '../../services/history/history.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-history-test-case',
  templateUrl: './history-test-case.component.html',
  styleUrls: ['./history-test-case.component.css']
})
export class HistoryTestCaseComponent implements OnInit {

  pageSize = 10;

  numPage = 1;

  testCase: GetHistoryTestCase;

  styleFailedOrCompleted: string[];
  emptyRow = [];
  projectId: number;
  testCaseId: number;
  titleTestCase: string;

  constructor(private auth: AuthService,
              private historyService: HistoryService,
              private route: ActivatedRoute,
              private router: Router) {
    this.testCaseId = +this.route.snapshot.paramMap.get('idTestCase');
    this.projectId = +this.route.snapshot.paramMap.get('idProject');
    this.route.queryParams
      .subscribe(params =>
        this.titleTestCase = params[Object.keys(params)[0]]);
    this.testCase = {
      historyTestCases: [],
      totalTestCases: 0
    };
    this.historyService.getHistoryTestCase(
      this.testCaseId, this.pageSize, this.numPage)
      .subscribe(elem => {
        this.testCase = elem;
        this.styleFailedOrCompleted = new Array<string>
        (this.testCase.historyTestCases.length).fill('color: green;', 0, this.testCase.historyTestCases.length);
        for (let i = 0; i < this.styleFailedOrCompleted.length; i++){
          if (this.testCase.historyTestCases[i].result === 'FAILED'){
            this.styleFailedOrCompleted[i] = 'color: red;';
          }
        }
        this.emptyRow = new Array(this.pageSize - this.testCase.historyTestCases.length + 3);
      });
  }

  pageChange(page: number): void {
    this.historyService.getHistoryTestCase(this.testCaseId,
      this.pageSize, page)
      .subscribe(elem => {
        this.testCase = elem;
        this.styleFailedOrCompleted = new Array<string>
        (this.testCase.historyTestCases.length).fill('color: green;', 0, this.testCase.historyTestCases.length);
        for (let i = 0; i < this.styleFailedOrCompleted.length; i++){
          if (this.testCase.historyTestCases[i].result === 'FAILED'){
            this.styleFailedOrCompleted[i] = 'color: red;';
          }
        }
        this.emptyRow = new Array(this.pageSize - this.testCase.historyTestCases.length + 3);
      });
  }

  detailsTestCase(id: number, date: string): void {
    let HTCTitle;
    this.route.queryParams
      .subscribe(params => {
        HTCTitle = params[Object.keys(params)[0]];
        this.router.navigate(['projects', this.projectId, 'test-cases', this.testCaseId, 'history', id],
          {queryParams: { HTCTitle: HTCTitle}});
      });
  }

  goBack(): void {
    this.router.navigate(['/projects', this.projectId, 'test-cases']);
  }

  ngOnInit(): void {

  }

}
