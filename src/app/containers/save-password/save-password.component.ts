import { Component, OnInit } from '@angular/core';
import {ResetPasswordService} from '../../services/reset-password.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-save-password',
  templateUrl: './save-password.component.html',
  styleUrls: ['./save-password.component.css']
})
export class SavePasswordComponent implements OnInit {

  resetToken: string;
  password: string;

  constructor(private resetService: ResetPasswordService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
          this.resetToken = params.token;
        }
      );
    // this.resetService.sendResetTokenAndPassword(resetToken, password).subscribe();
  }

}
