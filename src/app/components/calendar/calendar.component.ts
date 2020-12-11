import {Component, OnInit, ViewChild} from '@angular/core';
import {Calendar, CalendarOptions, FullCalendarComponent} from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  calendarOptions: CalendarOptions = null;


  @ViewChild('calendar') calendarComponent: FullCalendarComponent;

  constructor() {
  }

  ngOnInit(): void {
    this.calendarOptions = {
      initialView: 'dayGridMonth',
      events: [
        {title: 'test-1', date: '2020-12-10'},
        {title: 'test-2', date: '2020-12-23'},
        {title: 'test-3', date: '2021-01-14'}],
      eventColor: '#378006',
      plugins: [dayGridPlugin]
    };
  }
}
