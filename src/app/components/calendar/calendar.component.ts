import {Component, OnInit, ViewChild} from '@angular/core';
import {
  Calendar,
  DateSelectArg,
  CalendarOptions,
  EventClickArg,
  FullCalendarComponent,
  EventApi,
} from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import {AuthService} from '../../services/auth/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {CalendarService} from '../../services/calendar/calendar.service';
import {User} from '../../models/user/user';
import {TestCaseDate} from '../../models/date/test-case-date';

declare var $: any;

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  calendarOptions: CalendarOptions = null;
  authenticationServiceSubscription: Subscription;
  datesSubscription: Subscription;
  dates: TestCaseDate[] = [];
  eventsList: Array<{ title: string, startStr: string }> = [];
  user: User;

  @ViewChild('calendar') calendarComponent: FullCalendarComponent;

  constructor(private authenticationService: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private datesService: CalendarService) {
    this.authenticationServiceSubscription = this.authenticationService.user.subscribe(
      x => {
        this.user = x;
      }
    );
  }

  ngOnInit(): void {
    this.handleDates();
    this.calendarOptions = {
      initialView: 'dayGridMonth',
      eventColor: '#378006',
      selectable: true,
      selectMirror: true,
      plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
      select: this.handleDateClick.bind(this),
      eventClick: this.handleEventClick.bind(this),
      events: [{
        title: "something",
        start: "2020-12-24",
      }],
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek'
      },
    };
  }

  handleDateClick(selectInfo: DateSelectArg): void {
    this.router.navigate(['calendar/add-event'], {queryParams: {dateStart: selectInfo.startStr}});
  }

  handleEventClick(clickInfo: EventClickArg): void {
    this.dates.forEach((date: TestCaseDate) => {
      if (+clickInfo.event.id === date.id) {
        this.router.navigate(['calendar/edit-event'], {
          queryParams: {
            dateStart: clickInfo.event.startStr,
            testCaseId: clickInfo.event.id,
            repeatable: date.repeatable
          }
        });
      }
    });
  }

  private handleDates(): void {
    this.datesSubscription = this.datesService
      .getDates()
      .subscribe(data => {
        data.forEach((date: TestCaseDate) => {
            this.dates.push(date);
            // this.eventsList.push({title: date.title, startStr: date.executionCronDate});
            $('datesCalendar').events.addEvent({
              id: date.id,
              title: date.title,
              start: date.executionCronDate
            }, true);
          }
        );
      });
    // this.eventsList.forEach(even => {
    //   $('datesCalendar').events.addEvent({
    //     title: even.title,
    //     start: even.startStr
    //   }, true);
    //   }
    // );
  }
}

