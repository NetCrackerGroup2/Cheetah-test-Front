import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TestCaseService} from "../../services/test-case/test-case.service";
import {Subscription} from "rxjs";
import {User} from "../../models/user/user";
import {ActionResult} from "../../models/action-result/ActionResult";

@Component({
  selector: 'app-test-case-details',
  templateUrl: './test-case-details.component.html',
  styleUrls: ['./test-case-details.component.css']
})
export class TestCaseDetailsComponent implements OnInit {
  projectId: number;
  user: User;
  testCaseTitle: string;
  testCaseId: number;
  actions: ActionResult[];
  authenticationServiceSubscription: Subscription;
  thePageNumber = 1;
  thePageSize = 5;
  theTotalElements: number;

  constructor(private authenticationService: AuthService,
              public router: Router,
              private route: ActivatedRoute,
              private resultService: TestCaseService) {
    this.authenticationServiceSubscription = this.authenticationService.user.subscribe(
      x => {
        this.user = x;
      });
  }

  ngOnInit(): void {
    this.listActions();
  }

  listActions(): void {

  }
}
