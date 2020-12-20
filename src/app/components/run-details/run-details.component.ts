import {Component, OnInit} from '@angular/core';
import {ActionResult, ActionResultStatus} from '../../models/action-result/ActionResult';
import {User} from '../../models/user/user';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';
import {WebsocketService} from '../../services/websocket/websocket.service';
import {WS} from '../../services/websocket/websocket.events';

@Component({
  selector: 'app-run-details',
  templateUrl: './run-details.component.html',
  styleUrls: ['./run-details.component.css']
})
export class RunDetailsComponent implements OnInit {
  detailsSwitch: number;
  actionResults: ActionResult[] = [];
  testCaseId: number;
  projectId: number;
  isCompleted: boolean;
  connection: WebSocket;
  user: User;
  totalActionResults: number;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthService,
              private websocketService: WebsocketService
              ) {
    this.testCaseId = route.snapshot.params.idTestCase;
    this.projectId = route.snapshot.params.idProject;
    this.user = this.authenticationService.userValue;
  }

  ngOnInit(): void {
    this.subscribeOnMessages();
  }

  subscribeOnMessages(): void {
    this.websocketService.on(WS.ON.TEST_CASE_ACTIONS).subscribe((data: TestCaseProgressReport) => {
      if (data.idTestCase === this.testCaseId) {
        this.actionResults = data.completed;
        this.totalActionResults = data.totalActionResults;
      }
    });
  }

  isSuccessful(actionStatus: ActionResultStatus): string {
    if (actionStatus === ActionResultStatus.SUCCESS) {
      return 'green';
    } else {
      return 'red';
    }
  }

  showDetails(index: number): boolean {
    return this.detailsSwitch === index;
  }

  getDetails(index: number): void {
    if (this.detailsSwitch === index) {
      this.detailsSwitch = -1;
    } else {
      this.detailsSwitch = index;
    }
  }

  goBack(): void {
    this.router.navigate(['/projects', this.projectId, 'test-cases']);
  }
}

export class ProgressMessage {
  event: string;
  data: TestCaseProgressReport;
}

export class TestCaseProgressReport {
  totalActionResults: number;
  completed: ActionResult[];
  idTestCase: number;

}
