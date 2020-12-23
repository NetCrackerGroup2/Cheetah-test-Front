import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-general-test-scenario',
  templateUrl: './general-test-scenario.component.html',
  styleUrls: ['./general-test-scenario.component.css']
})
export class GeneralTestScenarioComponent implements OnInit {

  theTestCaseId: number;
  projectId: number;

  constructor(private router: Router, private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.theTestCaseId = +this.route.snapshot.paramMap.get('id');
    this.projectId = +this.route.snapshot.paramMap.get('projectId');
  }

  createTestScenario(): string {
    return `/projects/${this.projectId}/create-test-scenario/${this.theTestCaseId}`;
  }

  createCompound(): void {
    this.router.navigate(['library-create-compound']);
  }

  goToTestCase(): void {
    // this.router.navigate([`projects/${this.theTestCaseId}/test-cases`]);
    this.router.navigate(['projects', this.projectId, 'test-cases']);
  }
}
