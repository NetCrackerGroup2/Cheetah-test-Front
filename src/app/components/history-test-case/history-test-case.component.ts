import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth/auth.service';
import {GetHistoryTestCase, HistoryService} from '../../services/history/history.service';

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

  constructor(private auth: AuthService,
              private historyService: HistoryService) {
    this.testCase = {
      historyTestCases: [],
      totalTestCases: 0
    };
    this.historyService.getHistoryTestCase(
      this.pageSize, this.numPage)
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
    this.historyService.getHistoryTestCase(
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

  ngOnInit(): void {

  }

}
