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
    this.getActions();
    this.connectToWs();
  }

  getActions(): void {
    /* this.actionResults = [
       {
         action: {compoundId: 123, actionType: 'read', element: 'test1', argument: 'arg1'},
         status: ActionStatus.SUCCESSFUL,
         description: 'lol',
         screenshotUrl: 'idk.com'
       },
       {
         action: {compoundId: 344, actionType: 'readaasd', element: 'tes1dgt1', argument: 'arg1'},
         status: ActionStatus.SUCCESSFUL,
         description: 'lolfbb',
         screenshotUrl: 'idk.cbafom'
       }, {
         action: {compoundId: 455, actionType: 'reasdgad', element: 'teasfgst1', argument: 'arg1'},
         status: ActionStatus.FAILED,
         description: 'lolbab',
         screenshotUrl: 'idkafb.com'
       }, {
         action: {compoundId: 1234, actionType: 'readgd', element: 'tesat1', argument: 'arg1'},
         status: ActionStatus.SUCCESSFUL,
         description: 'lobbl',
         screenshotUrl: 'idkafb.com'
       }, {
         action: {compoundId: 566, actionType: 'reaghhad', element: 'tehst1', argument: 'arg1'},
         status: ActionStatus.FAILED,
         description: 'lodasfl',
         screenshotUrl: 'idafk.com'
       }, {
         action: {compoundId: 146, actionType: 'rerqad', element: 'testhh1', argument: 'arg1'},
         status: ActionStatus.SUCCESSFUL,
         description: 'lofal',
         screenshotUrl: 'iabfdk.com'
       }, {
         action: {compoundId: 146, actionType: 'rehad', element: 'teafst1', argument: 'arg1'},
         status: ActionStatus.SUCCESSFUL,
         description: 'lvvvol',
         screenshotUrl: 'idk.com'
       }, {
         action: {compoundId: 2355, actionType: 'reafgd', element: 'thsfest1', argument: 'arg1'},
         status: ActionStatus.FAILED,
         description: 'lovvl',
         screenshotUrl: 'idabfk.com'
       },

     ];*/
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

  constructor(message: any) {
    this.event = message.event;
    this.data = new TestCaseProgressReport(message.data);
  }
}

export class TestCaseProgressReport {
  totalActionResults: number;
  completed: ActionResult[];
  idTestCase: number;

  constructor(data: any) {
    this.totalActionResults = data.totalActionResults;
    for (const actionResult of data.completed) {
      this.completed.push(new ActionResult(actionResult));
    }
    this.idTestCase = data.idTestCase;
  }
}

