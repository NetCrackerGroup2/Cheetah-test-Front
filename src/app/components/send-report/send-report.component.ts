import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-send-report',
  templateUrl: './send-report.component.html',
  styleUrls: ['./send-report.component.css']
})
export class SendReportComponent implements OnInit {
  testCaseId: number;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.testCaseId = route.snapshot.params.idTestCase;
  }

  ngOnInit(): void {
  }

  goBack(): void {
    this.router.navigate(['/test-scenario', this.testCaseId, 'info']);
  }
}
