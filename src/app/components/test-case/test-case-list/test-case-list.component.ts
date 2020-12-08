import {Component, Input, OnInit} from '@angular/core';
import {TestCase} from '../../../models/test-case/test-case';
import {TestCaseService} from '../../../services/test-case/test-case.service';
import {take} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {ProjectService} from '../../../services/project/project.service';
import {Project} from '../../../models/project/entity/project';

@Component({
  selector: 'app-testcase',
  templateUrl: './test-case-list.component.html',
  styleUrls: ['./test-case-list.component.css']
})
export class TestCaseListComponent implements OnInit {

  testCases: TestCase[] = [];
  runTestCasesList: TestCase[] = [];

  projectId: number;
  currentProject: Project;
  previousKeyword: string = null;
  searchValue = '';
  searchMode = false;
  pageNum = 1;
  pageSize = 5;
  totalElements = 0;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private testCaseService: TestCaseService,
              private projectService: ProjectService
  ) {
    this.projectId = +this.route.snapshot.paramMap.get('id');
    this.currentProject = new Project();
    this.projectService.getProjectById(this.projectId).subscribe( data => {
        this.currentProject.id = data.id;
        this.currentProject.title = data.title;
        this.currentProject.createDate = data.createDate;
        this.currentProject.status = data.status;
        this.currentProject.link = data.link;
      }
    );
  }

  ngOnInit(): void {
      this.showTestCaseList();
  }

  public showTestCaseList(): void {
     this.searchMode = !!this.searchValue;
     if (this.searchMode) {
       this.handleSearchTestCases();
     }
     else {
       this.handleTestCases();
     }
  }

  private handleSearchTestCases(): void {
      this.testCaseService.findTestCaseByTitle(
        this.projectId,
        this.pageNum,
        this.pageSize,
        this.searchValue
      ).pipe(take(1))
        .subscribe(data => {
          this.testCases = data.testCaseList;
          this.totalElements = data.totalElements;
        }
      );
  }

  private handleTestCases(): void {
    this.testCaseService
      .getTestCases(this.projectId, this.pageNum, this.pageSize)
      .pipe(take(1))
      .subscribe(data => {
        this.testCases = data.testCaseList;
        this.totalElements = data.totalElements;
      });
  }

  deactivateTestCase(id: number): void {
    this.runTestCasesList = this.runTestCasesList.filter(t => t.id !== id);
    this.testCaseService.deactivateTestCase(id)
      .pipe(take(1))
      .subscribe(() => this.showTestCaseList());
  }

  search(value: string): void {
    this.searchValue = value;
    this.showTestCaseList();
  }

  runTestCases(): void {
    console.log(this.runTestCasesList);
  }

  isCheckedTestCase(testCase: TestCase): boolean {
      for (const tC of this.runTestCasesList) {
        if (testCase.id === tC.id) {
          return true;
        }
      }
      return false;
  }

  handleRunTestCases(testCase: TestCase): void {
      if (this.isCheckedTestCase(testCase)) {
        this.runTestCasesList = this.runTestCasesList.filter(t => t.id !== testCase.id);
      }
      else {
        this.runTestCasesList.push(testCase);
      }
  }

  create(): void {
    this.router.navigate(['projects', this.projectId, 'test-cases', 'create-test-case']);
  }

  edit(id: number): void {
    this.router.navigate(['projects', this.projectId, 'test-cases', 'edit-test-case', id]);
  }

  getReportDetails(id: number): void {
    this.router.navigate(['projects', this.projectId, 'test-cases', id]);
  }

  getLastReportDetails(): void {
    this.router.navigate(['projects', this.projectId, 'test-cases', 'last-report-details']);
  }
}
