import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  username =  'Alina Smith';
  email = 'alinasmith@gmail.com';
  role = 'manager';

  fileToUpload: File = null;


  url = 'assets/sidebar_images/img_example.jpg';

  constructor() { }

  fileInput(event: any) {
    if (event.target.files && event.target.files[0]) {
          const reader = new FileReader();

          reader.onload = (event: any) => {
              this.url = event.target.result;
          };
          reader.readAsDataURL(event.target.files[0]);
    }
  }

  ngOnInit() {
  }

}
