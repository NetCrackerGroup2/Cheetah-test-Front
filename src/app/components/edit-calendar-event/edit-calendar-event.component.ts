import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from '../../models/user/user';
import {DatePostDto} from '../../models/date/date-post-dto';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Subject, Subscription} from 'rxjs';
import {AuthService} from '../../services/auth/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CalendarService} from '../../services/calendar/calendar.service';
declare var $: any;

@Component({
  selector: 'app-edit-calendar-event',
  templateUrl: './edit-calendar-event.component.html',
  styleUrls: ['./edit-calendar-event.component.css']
})
export class EditCalendarEventComponent implements OnInit {
  user: User;
  dateDto: DatePostDto = new DatePostDto();
  dateFinish: Date;
  time: string;
  editEventForm: FormGroup;
  loading = false;
  authenticationServiceSubscription: Subscription;
  private querySubscription: Subscription;
  searchTerm$ = new Subject<string>();
  datesSubscription: Subscription;
  @ViewChild('term') term;

  constructor(private authenticationService: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private сalendarService: CalendarService) {
    this.authenticationServiceSubscription = this.authenticationService.user.subscribe(
      x => {
        this.user = x;
      }
    );
    this.querySubscription = route.queryParams.subscribe(
      (queryParam: any) => {
        this.dateDto.testCaseId = +queryParam.testCaseId;
        if (queryParam.repeatable === 'true') {
          this.dateDto.repeatable = true;
        } else {
          this.dateDto.repeatable = false;
        }
        console.log(this.dateDto);
      }
    );
  }

  ngOnInit(): void {
    $('#newDate').min = Date.now();
    this.editEventForm = this.formBuilder.group({
      name: new FormControl('',
        [Validators.required,
          Validators.maxLength(100),
          Validators.minLength(3)]),
      description: new FormControl('',
        [Validators.required, Validators.maxLength(300)])
    });
  }

  onSubmit(): void {
    const newDate = new Date($('#newDate').val());
    const newTime = document.querySelector('input[type="time"]');
    // @ts-ignore
    this.dateDto.executionCronDate = newDate.getFullYear() + '-' + (newDate.getMonth() + 1) + '-' + newDate.getDate() + 'T' + newTime.value + ':00';
    this.datesSubscription = this.сalendarService
      .editEvent(this.dateDto).subscribe();
    this.router.navigate(['/calendar']);
  }

  delete(): void {
    this.datesSubscription = this.сalendarService
      .deleteDates(this.dateDto.testCaseId).subscribe();
    this.router.navigate(['/calendar']);
  }
}
