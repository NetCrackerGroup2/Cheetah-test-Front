import { Component, OnInit } from '@angular/core';
import {TestCase} from '../../../models/test-case/test-case';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-testcase',
  templateUrl: './test-case.component.html',
  styleUrls: ['./test-case.component.css']
})
export class TestCaseComponent implements OnInit {
  testCases: TestCase[] = [
    {id: 1, title: 'Test home page', projectId: 12, status: 'In progress', result: 'ag'},
    {id: 2, title: 'Test login', projectId: 12, status: 'Suspended', result: 'ag'},
    {id: 3, title: 'Test link', projectId: 12, status: 'Finished', result: 'ag'},
    {id: 4, title: 'Test button', projectId: 12, status: 'Finished', result: 'ag'},
    {id: 5, title: 'Test scenario with 3 buttons', projectId: 12, status: 'Not started', result: 'ag'},
    {id: 6, title: 'Test sign-up page', projectId: 12, status: 'Finished', result: 'ag'},
    {id: 6, title: 'Test dashboard', projectId: 12, status: 'Finished', result: 'ag'},
    {id: 6, title: 'Test sidebar features', projectId: 12, status: 'Suspended', result: 'ag'}
  ];

  pageNum = 1;
  pageSize = 5;
  totalElements = 0;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  getTestCaseList(): void {

  }
}
