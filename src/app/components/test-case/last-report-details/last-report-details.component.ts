import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-last-report-details',
  templateUrl: './last-report-details.component.html',
  styleUrls: ['./last-report-details.component.css']
})
export class LastReportDetailsComponent implements OnInit {
  projectId: number;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.projectId = +this.route.snapshot.paramMap.get('projectId');
  }

  ngOnInit(): void {
  }

  back(): void {
    this.router.navigate(['projects', this.projectId, 'test-cases']);
  }
}
