import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Subject, Subscription} from 'rxjs';

import {User} from '../../models/user/user';
import {take} from 'rxjs/operators';
import {SendReportService} from '../../services/send-report/send-report.service';
import {ProfilesService} from '../../services/profiles/profiles.service';

@Component({
  selector: 'app-send-report',
  templateUrl: './send-report.component.html',
  styleUrls: ['./send-report.component.css']
})
export class SendReportComponent implements OnInit {
  testCaseId: number;
  projectId: number;
  idHTC: number;
  successMessage: string;
  errorMessage: string;
  sendReportForm: FormGroup;
  addedEmails: string[] = [];
  users: User[] = [];
  searchTerm$ = new Subject<string>();
  searchProfilesSubscription: Subscription;
  loading = false;
  @ViewChild('term') term;


  constructor(private router: Router, private route: ActivatedRoute,
              private formBuilder: FormBuilder, private profilesService: ProfilesService,
              private sendReportService: SendReportService) {
    this.testCaseId = route.snapshot.params.idTestCase;
    this.projectId = route.snapshot.params.idProject;
    this.idHTC = route.snapshot.params.idHTC;

    this.searchProfilesSubscription = this.profilesService.search(this.searchTerm$)
      .subscribe(results => {
        this.users = results;
      });
  }

  ngOnInit(): void {
    this.sendReportForm = this.formBuilder.group({
      email: new FormControl('',
        [Validators.maxLength(100)])
    });
  }

  goBack(): void {
    this.router.navigate(['/projects', this.projectId, 'test-cases', this.testCaseId, this.idHTC]);
  }

  email(): any {
    return this.sendReportForm.get('email');
  }

  addToList(email: string): void {
    if (this.addedEmails.indexOf(email) === -1) {
      this.addedEmails.push(email);
    }
  }

  remove(email: string): void {
    const index = this.addedEmails.indexOf(email, 0);
    if (index > -1) {
      this.addedEmails.splice(index, 1);
    }
  }

  onSubmit(): void {
    this.successMessage = '';
    this.loading = true;
    this.sendReportService.sendReports(this.addedEmails, this.testCaseId, this.projectId)
      .pipe(take(1))
      .subscribe(
        data => {
          if (data) {
            this.successMessage = 'Report was sent to chosen emails';
            this.loading = false;
            this.sendReportForm.reset();
            this.addedEmails = [];
          } else {
            this.errorMessage = 'Server error';
            this.loading = false;
          }
        });
  }
}
