import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/services/auth/auth.service';
import {ProfileService} from '../../services/profile/profile.service';
import {Router} from '@angular/router';
import {AppComponent} from '../../app.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  username: string;
  email: string;
  role: string;

  fileToUpload: File = null;

  url: string;

  constructor(private authService: AuthService,
              private profileService: ProfileService,
              private router: Router,
              private app: AppComponent) {
    this.username = authService.userValue.name;
    this.email = authService.userValue.email;
    this.role = authService.userValue.role;
    profileService.getPhotoURL(this.email).subscribe(
      (elem) => this.url = elem ? elem : 'assets/sidebar_images/img_example.jpg');
  }

  fileInput(event: any): void {
    if (event.target.files && event.target.files[0]) {
          const reader = new FileReader();
          reader.onload = (elem: any) => {
              this.url = elem.target.result;
          };
          reader.readAsDataURL(event.target.files[0]);
          this.profileService.postUploadFile(event.target.files[0], this.email);
          this.app.setUrl(event);
    }
  }

  ngOnInit(): void { }

}
