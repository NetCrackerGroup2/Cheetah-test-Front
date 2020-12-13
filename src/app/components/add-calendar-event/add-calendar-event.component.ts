import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from "../../models/user/user";
import {Subject, Subscription} from "rxjs";
import {AuthService} from "../../services/auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {first, take} from "rxjs/operators";
import {FormGroup} from "@angular/forms";
import {TestCase} from "../../models/test-case/test-case";
import {DatePostDto} from "../../models/date/date-post-dto";
import {CalendarEventService} from "../../services/calendar-event/calendar-event.service";

@Component({
  selector: 'app-add-calendar-event',
  templateUrl: './add-calendar-event.component.html',
  styleUrls: ['./add-calendar-event.component.css']
})
export class AddCalendarEventComponent implements OnInit {
  user: User;
  dateDto: DatePostDto;
  dateStart: Date;
  dateFinish: Date;
  time: string;
  createEventForm: FormGroup;
  loading = false;
  successMessage: string;
  errorMessage: string;
  createEventSubscription: Subscription;
  testCases: TestCase[];
  authenticationServiceSubscription: Subscription;
  private querySubscription: Subscription;
  searchTerm$ = new Subject<string>();
  @ViewChild('term') term;

  constructor(private authenticationService: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private eventService: CalendarEventService) {
    this.authenticationServiceSubscription = this.authenticationService.user.subscribe(
      x => {
        this.user = x;
      }
    );
    this.querySubscription = route.queryParams.subscribe(
      (queryParam: any) => {
        this.dateStart = queryParam['dateStart'];
        this.dateFinish = queryParam['dateFinish'];
        this.time = queryParam['time'];
      }
    );
  }

  ngOnInit(): void {
    this.handleTestCases();
  }

  private handleTestCases(): void {
    // this.addEventService
    //   .getTestCases(this.user.email)
    //   .pipe(take(1))
    //   .subscribe(data => {
    //     this.testCases = data;
    //   });
  }

  addToDto(testCase: TestCase): void{
    this.dateDto.testCaseId = testCase.id;
  }

  createEvent(): void {

  }

  onSubmit(): void {
    this.errorMessage = '';
    this.successMessage = '';
    this.loading = true;

    // this.createEventSubscription = this.addEventService.save(testCase, this.isEdit, this.id)
    //   .pipe(first())
    //   .subscribe(
    //     data => {
    //       if (data === 'Test Case Already Exists') {
    //         this.errorMessage = 'Test Case Already Exists';
    //       } else if (data === 'Project Not Found') {
    //         this.errorMessage = 'Project Not Found';
    //       } else if (data) {
    //         this.successMessage = 'Test Case has been successfully saved';
    //         this.createEventForm.reset();
    //       } else {
    //         this.errorMessage = 'Server error';
    //       }
    //
    //       this.loading = false;
    //     });
  }
  get title(): any {
    return this.createEventForm.get('title');
  }
}
