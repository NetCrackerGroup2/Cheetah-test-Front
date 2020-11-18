import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user/user';
import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: User;
  constructor(
    private authenticationService: AuthService
  ) {
    this.user = this.authenticationService.userValue;
  }

  ngOnInit(): void {
  }

}
