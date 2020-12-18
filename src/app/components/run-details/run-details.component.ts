import {Component, OnInit} from '@angular/core';
import {ActionResult, ActionResultStatus} from '../../models/action-result/ActionResult';
import {User} from '../../models/user/user';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';
import {Stomp} from '@stomp/stompjs';

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

  constructor(private route: ActivatedRoute, private router: Router,
              private authenticationService: AuthService) {
    this.testCaseId = route.snapshot.params.idTestCase;
    this.projectId = route.snapshot.params.idProject;
    this.user = this.authenticationService.userValue;
  }

  ngOnInit(): void {
    this.connectToWs();
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

  connectToWs(): void {
    // todo replace that code with websocket service from notifications
    const ws = Stomp.over(() => {
      return new WebSocket('ws://localhost:8080/notifications');
    });

    ws.connect({}, () => {
      ws.subscribe('/user/queue/notifications', message => {
        const parsedMessage: ProgressMessage = JSON.parse(message.body) as ProgressMessage;
        // console.log(parsedMessage);
        console.log('event has name: ' + parsedMessage.event);
        console.log('event has idtestcase:' + parsedMessage.data.idTestCase);
        console.log('event id test case compares to :' + this.testCaseId);
        console.log(parsedMessage.event === 'test-case-execution-actions');
        console.log(parsedMessage.data.idTestCase === this.testCaseId);
        // tslint:disable-next-line:triple-equals
        if (parsedMessage.event === 'test-case-execution-actions' && parsedMessage.data.idTestCase == this.testCaseId) {
          this.actionResults = parsedMessage.data.completed;
          console.log(this.actionResults);
          console.log(parsedMessage.data.completed);
        }
      });
      ws.send('/notifications', {Authorization: `${this.user.accessToken}`}, JSON.stringify({event: 'get-notifications', data: {}}));
    });
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
