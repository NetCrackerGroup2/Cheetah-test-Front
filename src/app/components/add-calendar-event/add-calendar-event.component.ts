import { Component, OnInit } from '@angular/core';
import {User} from "../../models/user/user";
import {Subscription} from "rxjs";
import {AuthService} from "../../services/auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AddCalendarEventService} from "../../services/add-calendar-event/add-calendar-event.service";

@Component({
  selector: 'app-add-calendar-event',
  templateUrl: './add-calendar-event.component.html',
  styleUrls: ['./add-calendar-event.component.css']
})
export class AddCalendarEventComponent implements OnInit {
  user: User;
  time: string;
  date: Date;
  theTestCaseId: number;
  authenticationServiceSubscription: Subscription;
  private querySubscription: Subscription;

  constructor(private authenticationService: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private addEventService: AddCalendarEventService) {
    this.authenticationServiceSubscription = this.authenticationService.user.subscribe(
      x => {
        this.user = x;
      }
    );
    this.querySubscription = route.queryParams.subscribe(
      (queryParam: any) => {
        this.date = queryParam['date'];
      }
    );
  }

  ngOnInit(): void {
  }

}
