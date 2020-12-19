import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from "../../models/user/user";
import {DatePostDto} from "../../models/date/date-post-dto";
import {FormGroup} from "@angular/forms";
import {Subject, Subscription} from "rxjs";
import {AuthService} from "../../services/auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CalendarService} from "../../services/calendar/calendar.service";

@Component({
  selector: 'app-edit-calendar-event',
  templateUrl: './edit-calendar-event.component.html',
  styleUrls: ['./edit-calendar-event.component.css']
})
export class EditCalendarEventComponent implements OnInit {
  user: User;
  dateDto: DatePostDto;
  dateStart: Date;
  dateFinish: Date;
  time: string;
  editEventForm: FormGroup;
  loading = false;
  authenticationServiceSubscription: Subscription;
  private querySubscription: Subscription;
  searchTerm$ = new Subject<string>();
  @ViewChild('term') term;

  constructor(private authenticationService: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private eventService: CalendarService) {
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
  }

}
