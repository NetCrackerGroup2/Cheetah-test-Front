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
  passwordConfirm: string;
  message: string;
  constructor(private resetService: ResetPasswordService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
          this.resetToken = params.token;
        }
      );

  }
  resetPassword(): void {
    if (this.password === this.passwordConfirm){
      this.resetService.sendResetTokenAndPassword(this.resetToken, this.password).subscribe(body => {
        console.log('before comparing');
        console.log(body.status);
        if (body.status === 'same.password'){
          this.message = 'Same password as before';
        }
        if (body.status === 'message.resetPasswordSuc'){
          this.message = 'password was successfully updated';
        }
        if (body.status === 'reset.token.null'){
          this.message = 'Reset token doesn`t exist';
        }
        }
      );
    }else{
      this.message = 'password in confirmation doesn`t match';
    }

  }
}
