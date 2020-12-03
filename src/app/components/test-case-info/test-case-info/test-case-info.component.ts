import {Component, OnInit} from '@angular/core';
import {ActionResult} from '../../../models/action-result/ActionResult';
import {ActionStatus} from '../../../models/action-result/ActionStatus';
import {ActivatedRoute, Router} from '@angular/router';
import {map} from 'rxjs/operators';

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
  isCompleted: boolean;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.testCaseId = route.snapshot.params.idTestCase;

  }

  ngOnInit(): void {
    this.doSearch('');
  }

  doSearch(title: string): void {
    this.actionResults = [
      {
        action: {id: 123, type: 'read', title: 'test1', description: 'description1', libraryId: 132},
        status: ActionStatus.SUCCESSFUL,
        description: 'lol',
        screenshotUrl: 'idk.com'
      },
      {
        action: {id: 1, type: 'afe', title: 'wfa', description: 'dewfafscription1', libraryId: 1232},
        status: ActionStatus.FAILED,
        description: 'dd',
        screenshotUrl: 'idfk.com'
      },
      {
        action: {id: 1233, type: 'red', title: 'tesdft1', description: 'descrasdfiption1', libraryId: 132},
        status: ActionStatus.SUCCESSFUL,
        description: 'lol',
        screenshotUrl: 'idk.com'
      },
      {
        action: {id: 1123, type: 'read', title: 'tesasdt1', description: 'desasdfcription1', libraryId: 1332},
        status: ActionStatus.SUCCESSFUL,
        description: 'logl',
        screenshotUrl: 'idk.com'
      },
      {
        action: {id: 11423, type: 'reasfd', title: 'testfsds1', description: 'descrsdfiption1', libraryId: 1432},
        status: ActionStatus.SUCCESSFUL,
        description: 'lol',
        screenshotUrl: 'idk.com'
      },
      {
        action: {id: 11623, type: 'reasfgsd', title: 'tesfdgt1', description: 'descrisdfgption1', libraryId: 1352},
        status: ActionStatus.SUCCESSFUL,
        description: 'lofgl',
        screenshotUrl: 'idk.com'
      }

    ]
    ;
  }

  isSuccessful(actionStatus: ActionStatus): string {
    if (actionStatus === ActionStatus.SUCCESSFUL) {
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
    this.router.navigate(['/data-set', this.testCaseId]);
  }

  viewPDF(): void {

  }
}
