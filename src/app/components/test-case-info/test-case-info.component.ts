import {Component, OnInit} from '@angular/core';
import {ActionStatus} from '../../models/action-result/ActionStatus';
import {ActivatedRoute, Router} from '@angular/router';
import {ActionResultFID, TestCaseInfoService} from '../../services/test-case-info/test-case-info.service';

@Component({
  selector: 'app-test-case-info',
  templateUrl: './test-case-info.component.html',
  styleUrls: ['./test-case-info.component.css'],
  styles: []
})
export class TestCaseInfoComponent implements OnInit {
  detailsSwitch: number;
  actionResults: ActionResultFID[] = [];
  testCaseId: number;
  projectId: number;
  idHTC: number;
  isCompleted: boolean;
  htcTitle: string;

  constructor(private route: ActivatedRoute, private router: Router, private tciService: TestCaseInfoService) {
    this.testCaseId = route.snapshot.params.idTestCase;
    this.projectId = route.snapshot.params.idProject;
    this.idHTC = route.snapshot.params.idHTC;
    this.htcTitle = this.route.snapshot.paramMap.get('HTCTitle');
    this.getActions();
  }

  ngOnInit(): void {
  }

  getActions(): void {
    this.tciService.getActions(this.idHTC).subscribe(data => {
      this.actionResults = data;
    });
  }

  isSuccessful(actionStatus: ActionStatus): string {
    if (actionStatus === ActionStatus.SUCCESS) {
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

    this.router.navigate(['/projects', this.projectId, 'test-cases', this.testCaseId, this.idHTC, 'send-report']);
  }
}
