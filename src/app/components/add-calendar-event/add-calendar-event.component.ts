import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from '../../models/user/user';
import {Subject, Subscription} from 'rxjs';
import {AuthService} from '../../services/auth/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DatePostDto} from '../../models/date/date-post-dto';
declare var $: any;
import {CalendarService} from '../../services/calendar/calendar.service';
import {TestCaseDate} from '../../models/date/test-case-date';

@Component({
  selector: 'app-add-calendar-event',
  templateUrl: './add-calendar-event.component.html',
  styleUrls: ['./add-calendar-event.component.css']
})
export class AddCalendarEventComponent implements OnInit {
  user: User;
  dateDto: DatePostDto = new DatePostDto();
  dateStart: string;
  createEventForm: FormGroup;
  loading = false;
  createEventSubscription: Subscription;
  testCases: TestCaseDate[] = [];
  authenticationServiceSubscription: Subscription;
  searchTestCaseSubscription: Subscription;
  private querySubscription: Subscription;
  searchTerm$ = new Subject<string>();
  @ViewChild('term') term;

  constructor(private authenticationService: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private datesService: CalendarService) {
    this.authenticationServiceSubscription = this.authenticationService.user.subscribe(
      x => {
        this.user = x;
      });
    this.searchTestCaseSubscription = this.datesService.search(this.searchTerm$)
      .subscribe(results => {
        this.testCases = results;
      });
    this.querySubscription = route.queryParams.subscribe(
      (queryParam: any) => {
        this.dateStart = queryParam.dateStart;
        if(this.dateStart.length === 10){
          this.dateStart = this.dateStart + 'T00:00:00';
        }
      }
    );
  }

  ngOnInit(): void {
    this.createEventForm = this.formBuilder.group({
      name: new FormControl('',
        [Validators.required,
          Validators.maxLength(100),
          Validators.minLength(3)]),
      description: new FormControl('',
        [Validators.required, Validators.maxLength(300)])
    });
  }

  addToDto(testCase: TestCaseDate): void{
    this.dateDto.testCaseId = testCase.id;
    if(testCase.repeatable == null) {
      this.dateDto.repeatable = false;
    } else {
      this.dateDto.repeatable = true;
    }
    this.dateDto.executionCronDate = this.dateStart;
    $('#testCase_input').val(testCase.title);
  }

  createEvent(): void {
    this.datesService
      .createDates(this.dateDto)
      .subscribe();
    this.router.navigate(['/calendar']);
  }


  onSubmit(): void {

  }
}
