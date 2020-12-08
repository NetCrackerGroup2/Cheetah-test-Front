import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {User} from "../../models/user/user";
import {Role} from '../../models/roles/role';
import {Subscription} from "rxjs";
import {TestScenario} from "../../models/test-scenario/test-scenario";
import {AuthService} from "../../services/auth/auth.service";
import {TestScenarioService} from "../../services/test-scenario/test-scenario.service";

@Component({
  selector: 'app-test-scenario',
  templateUrl: './test-scenario.component.html',
  styleUrls: ['./test-scenario.component.css']
})
export class TestScenarioComponent implements OnInit, OnDestroy {



  user: User;
  authenticationServiceSubscription: Subscription;
  thePageNumber = 1;
  thePageSize = 5;
  theTotalElements = 0;
  testScenarioSearchSubscription: Subscription;
  testScenarioSubscription: Subscription;
  searchMode = false;
  previousKeyword: string = null;
  value = '';
  testScenarios: TestScenario[] = [];

  constructor(private authenticationService: AuthService,
              private router: Router,
              private testScenarioService: TestScenarioService) {
    this.authenticationServiceSubscription = this.authenticationService.user.subscribe(
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
    this.testScenarioSubscription = this.testScenarioService
      .getTestScenarios(this.thePageNumber, this.thePageSize)
      .subscribe(data => {
        this.testScenarios = data.testScenarios;
        this.theTotalElements = data.totaltestScenarios;
      });
  }

  private handleSearchTestScenarios(): void {
    const theKeyword: string = this.value;
    if (this.previousKeyword !== theKeyword) {
      this.thePageNumber = 1;
  }

    this.testScenarioSearchSubscription = this.testScenarioService.searchTestScenarios(
      this.thePageNumber,
      this.thePageSize,
      theKeyword)
      .subscribe(data => {
        this.testScenarios = data.testScenarios;
        this.theTotalElements = data.totaltestScenarios;
      });
  }

  remove(id: number): void {
    this.testScenarioService.remove(id).subscribe();
    this.listTestScenarios();
  }

  get isAdmin(): boolean {
    return this.user && this.user.role === Role.ADMIN;
  }

  ngOnDestroy(): void {
    if (this.authenticationServiceSubscription) {
      this.authenticationServiceSubscription.unsubscribe();
    }
    if (this.testScenarioSubscription){
      this.testScenarioSubscription.unsubscribe();
    }
    if (this.testScenarioSearchSubscription) {
      this.testScenarioSearchSubscription.unsubscribe();
    }
  }

  doSearch(value: string): void {
    this.value = value;
    this.listTestScenarios();
  }
}
