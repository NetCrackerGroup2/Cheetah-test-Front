import {Component, OnInit, ViewChild} from '@angular/core';
import {Calendar, CalendarOptions, FullCalendarComponent} from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import {AuthService} from "../../services/auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DataSetService} from "../../services/data-set/data-set.service";
import {Subscription} from "rxjs";
import {DataSet} from "../../models/data-set/data-set";
import {DateDto} from "../../models/date/date-dto";
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
  dates: DateDto[] = [];
  datesService: CalendarService;
  date: DateDto;
  user: User;

  @ViewChild('calendar') calendarComponent: FullCalendarComponent;

  constructor(private authenticationService: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private dataSetService: DataSetService) {
    this.authenticationServiceSubscription = this.authenticationService.user.subscribe(
      x => {
        this.user = x;
      }
    );
  }

  ngOnInit(): void {
    this.listDates();
    this.calendarOptions = {
      initialView: 'dayGridMonth',
      events: [
        {title: 'test-1', date: '2020-12-10'},
        {title: 'test-2', date: '2020-12-23'},
        {title: 'test-3', date: '2021-01-14'}],
      eventColor: '#378006',
      editable: true,
      plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
      dateClick: this.handleDateClick.bind(this),
      customButtons: {
        testCaseButton: {
          text: 'Add TestCase',
          click: function () {
            alert('clicked the custom button!');
          }
        }
      },
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,testCaseButton'
      },
    };
  }

  handleDateClick(arg) {
    console.log(arg);
  }

  listDates(): void {
    this.handleDates();
  }

  private handleDates(): void {
    this.datesSubscription = this.datesService
      .getDates()
      .subscribe(data => {
        this.dates = data.dates;
      });
  }
}

