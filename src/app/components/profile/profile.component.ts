import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/services/auth/auth.service';

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

  constructor(private authService: AuthService) {
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
          reader.readAsDataURL(event.target.files[0]);
    }
  }

  ngOnInit(): void { }

}
