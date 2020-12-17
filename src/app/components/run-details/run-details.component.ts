import { Component, OnInit } from '@angular/core';

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
  constructor() { }

  ngOnInit(): void {
  }

}
