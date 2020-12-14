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
import * as parser from 'cron-parser';
import {CalendarService} from "../../services/calendar/calendar.service";
import {TestCaseService} from "../../services/test-case/test-case.service";

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
              private datesService: CalendarService,
              private testCaseService: TestCaseService) {
    this.authenticationServiceSubscription = this.authenticationService.user.subscribe(
      x => {
        this.user = x;
      }
    );
    this.querySubscription = route.queryParams.subscribe(
      (queryParam: any) => {
        this.dateStart = queryParam['dateStart'];
        this.time = queryParam['time'];
      }
    );
  }

  ngOnInit(): void {
    this.handleTestCases();
  }

  private handleTestCases(): void {
    // this.testCaseService
    //   .getTestCases(this.user.email)
    //   .pipe(take(1))
    //   .subscribe(data => {
    //     this.testCases = data;
    //   });
  }

  addToDto(testCase: TestCase): void{
    this.dateDto.testCaseId = testCase.id;
    // this.dateDto.executionCronDate = parser.parseExpression("* * * * * * * ", this.dateStart).next().toString();
  }

  createEvent(): void {

  }


  onSubmit(): void {

  }
}
