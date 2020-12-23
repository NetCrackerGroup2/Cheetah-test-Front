import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {User} from "../../models/user/user";
import {Role} from '../../models/roles/role';
import {TestScenario} from "../../models/test-scenario/test-scenario";
import {AuthService} from "../../services/auth/auth.service";
import {TestScenarioService} from "../../services/test-scenario/test-scenario.service";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-test-scenario',
  templateUrl: './test-scenario.component.html',
  styleUrls: ['./test-scenario.component.css']
})
export class TestScenarioComponent implements OnInit {

  user: User;
  thePageNumber = 1;
  thePageSize = 5;
  theTotalElements = 0;
  searchMode = false;
  previousKeyword: string = null;
  value = '';
  testScenarios: TestScenario[] = [];

  @Input() theTestCaseId;
  @Input() projectId;

  constructor(private authenticationService: AuthService,
              private router: Router,
              private testScenarioService: TestScenarioService) {
    this.authenticationService.user
      .pipe(take(1))
      .subscribe(
        x => {
          this.user = x;
        }
      );
  }

  ngOnInit(): void {
    this.listTestScenarios();
  }

  listTestScenarios(): void {
    this.searchMode = !!this.value;

    if (this.searchMode) {
      this.handleSearchTestScenarios();

    } else {
      this.handleTestScenarios();
    }
  }

  private handleTestScenarios(): void {
    this.testScenarioService
      .getTestScenarios(this.thePageNumber, this.thePageSize, this.theTestCaseId)
      .pipe(take(1))
      .subscribe(data => {
        this.testScenarios = data.testScenarios;
        this.theTotalElements = data.totalElements;
      });
  }

  private handleSearchTestScenarios(): void {
    const theKeyword: string = this.value;
    if (this.previousKeyword !== theKeyword) {
      this.thePageNumber = 1;
    }

    this.previousKeyword = theKeyword;

    this.testScenarioService.searchTestScenarios(
      this.thePageNumber,
      this.thePageSize,
      this.theTestCaseId,
      theKeyword)
      .pipe(take(1))
      .subscribe(data => {
        this.testScenarios = data.testScenarios;
        this.theTotalElements = data.totalElements;
      });
  }

  view(testScenario: TestScenario): void {
    this.router.navigate([`projects/${this.projectId}/test-scenario/${testScenario.id}/test-case/${testScenario.idTestCase}`],
      {
        queryParams: {
          testScenarioTitle: testScenario.title,
          testScenarioDescription: testScenario.description
        }
      });
  }

  remove(id: number): void {
    this.testScenarioService.remove(id)
      .pipe(take(1))
      .subscribe(
       () => this.listTestScenarios()
      );
  }

  get isAdmin(): boolean {
    return this.user && this.user.role === Role.ADMIN;
  }

  doSearch(value: string): void {
    this.value = value;
    this.listTestScenarios();
  }
}
