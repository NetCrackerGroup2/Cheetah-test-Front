import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/services/auth/auth.service';
import { ProfileService } from 'src/app/services/profile/profile.service';

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

  url = 'assets/sidebar_images/img_example.jpg';

  constructor(private authService: AuthService,
              private profileService: ProfileService) {
    this.username = authService.userValue.name;
    this.email = authService.userValue.email;
    this.role = authService.userValue.role;
  }
  fileInput(event: any): void {
    if (event.target.files && event.target.files[0]) {
          const reader = new FileReader();
          reader.onload = (elem: any) => {
              this.url = elem.target.result;
          };
          // const formData = new FormData();
          // formData.append();
          // this.fileToUpload = event.target.files[0];
          // formData.append('file', this.fileToUpload, this.fileToUpload.name);
          reader.readAsDataURL(event.target.files[0]);
          console.log(event.target.files[0].name);
          this.profileService.postUploadFile(event.target.fields);
    }
  }

  ngOnInit(): void { }

}
