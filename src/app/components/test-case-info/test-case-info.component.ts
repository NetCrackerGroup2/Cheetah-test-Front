import {Component, OnInit} from '@angular/core';
import {ActionResult, ActionResultStatus} from '../../models/action-result/ActionResult';
import {ActivatedRoute, Router} from '@angular/router';
import {TestCaseInfoService} from '../../services/test-case-info/test-case-info.service';
import {Stomp} from '@stomp/stompjs';
import {AuthService} from '../../services/auth/auth.service';
import {User} from '../../models/user/user';

@Component({
  selector: 'app-test-case-info',
  templateUrl: './test-case-info.component.html',
  styleUrls: ['./test-case-info.component.css'],
  styles: []
})
export class TestCaseInfoComponent implements OnInit {
  detailsSwitch: number;
  actionResults: ActionResult[] = [];
  testCaseId: number;
  projectId: number;
  isCompleted: boolean;
  connection: WebSocket;
  user: User;

  constructor(private route: ActivatedRoute, private router: Router, private tciService: TestCaseInfoService,
              private authenticationService: AuthService) {
    this.testCaseId = route.snapshot.params.idTestCase;
    this.projectId = route.snapshot.params.idProject;

    this.user = this.authenticationService.userValue;
  }

  ngOnInit(): void {
    this.connectToWs();
  }

  getActions(): void {
    this.tciService.getActions(this.testCaseId).subscribe(data => {
      this.actionResults = data;
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

  goBack(): void {
    this.router.navigate(['/projects', this.projectId, 'test-cases']);
  }

  sendReport(): void {

    this.router.navigate(['/projects', this.projectId, 'test-cases', this.testCaseId, 'send-report']);
  }

  connectToWs(): void {

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

