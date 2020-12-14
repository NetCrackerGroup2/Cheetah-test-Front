import {Component, OnInit, ViewChild} from '@angular/core';
import {Calendar, DateSelectArg, CalendarOptions, EventClickArg, EventApi, FullCalendarComponent} from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import {AuthService} from "../../services/auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {DateGetDto} from "../../models/date/date-get-dto";
import {CalendarService} from "../../services/calendar/calendar.service";
import {User} from "../../models/user/user";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  calendarOptions: CalendarOptions = null;
  authenticationServiceSubscription: Subscription;
  datesSubscription: Subscription;
  dates: DateGetDto[] = [];
  events: Event[] = [];
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
    console.log(this.dates);
    this.calendarOptions = {
      initialView: 'dayGridMonth',
      events: [{title: "test-1", date:"2020-12-12"}],
      eventColor: '#378006',
      selectable: true,
      selectMirror: true,
      plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
      select: this.handleDateClick.bind(this),
      eventClick: this.handleEventClick.bind(this),
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek'
      },
    };
  }

  handleDateClick(selectInfo: DateSelectArg): void {
    this.router.navigate(['calendar/add-event'], {queryParams: {dateStart: selectInfo.startStr, time: selectInfo.start}});
  }

  handleEventClick(clickInfo: EventClickArg): void {
    this.router.navigate(['calendar/edit-event'], {queryParams: {dateStart: clickInfo.event.startStr, time: clickInfo.event.start}});
  }

  private handleDates(): void {
    this.datesSubscription = this.datesService
      .getDates()
      .subscribe(data => {
        this.dates = data.dates;
      });
    console.log(this.dates);
  }

}

