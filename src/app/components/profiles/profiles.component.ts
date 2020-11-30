import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth/auth.service';
import { ProfileService, GetUser } from '../../services/profile/profile.service';
import {LoginDto} from '../../models/loginDto/loginDto';
import { User } from 'src/app/models/user/user';



@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent implements OnInit {

  searchUsername = '';
  searchEmail = '';
  searchRole = '';

  existUser = '';

  adminPassword = '';

  saveLastEmailEdit = '';

  numPage = 1;
  pageSize = 10;

  rowColor = false;
  rowColorName: Array<string>;

  deleteButton = 'Deactivate';

  relationElemSearch: Array<number>;

  textOnButtonUpdate: Array<string>;

  disabledPersonalData: Array<boolean>;

  options = ['Engeneer', 'Manager'];

  role = 'ALL';

  countries = [1, 2, 3];

  elements: GetUser;

  outputTable = [];

  headElements = ['Username', 'Email', 'Role'];

  user: User;

  styleDeactivate = '';

  disabledPasswordAdmin = true;

  indexUseToDeactivate = 0;



  pageChange(page: number): void {
    this.profileService.getSearchUser(this.searchUsername,
        this.searchEmail, this.searchRole,
        this.pageSize, page)
        .subscribe(elem => { this.elements = elem; });
  }

  constructor(private profileService: ProfileService,
              private authService: AuthService) {
    this.elements = {
      page: [],
      numElem: 8
    };
    this.profileService.getUser(this.pageSize, this.numPage)
      .subscribe(elem => { this.elements = elem; });
    this.disabledPersonalData = new Array<boolean>
      (this.pageSize).fill(true, 0, this.pageSize);
    this.textOnButtonUpdate = new Array<string>
      (this.pageSize).fill('Edit', 0, this.pageSize);
    this.rowColorName = new Array<string>
      (this.pageSize).fill('white', 0, this.pageSize);
    for (let i = 0; i < this.pageSize; i += 2){
      this.rowColorName[i] = '#EEF2F5';
    }
  }

  ngOnInit(): void {}

  editPersonalInformation(i: any): void {
    this.disabledPersonalData[i] = !this.disabledPersonalData[i];
    if (this.textOnButtonUpdate[i] === 'Edit') {
      this.saveLastEmailEdit = this.elements.page[i + (this.numPage - 1) * this.pageSize].email;
      this.textOnButtonUpdate[i] = 'Save';
    } else {
      const index = i + (this.numPage - 1) * this.pageSize;
      this.profileService.editUser(this.elements.page[index].name,
        this.elements.page[index].email,
        this.elements.page[index].role,
        this.saveLastEmailEdit);
      this.textOnButtonUpdate[i] = 'Edit';
    }
  }

  confirmAdminPassword(): void {
    this.disabledPasswordAdmin = true;
    this.styleDeactivate = '';
    const check: LoginDto = new LoginDto(this.user.email, this.adminPassword);
    this.authService.login(check).subscribe(
      elem => {
        if (elem){
          this.profileService.deactivateUser(this.elements
            .page[this.indexUseToDeactivate].email);
          delete this.elements.page[this.indexUseToDeactivate];
          this.elements.page = this.elements.page.filter(el => {
            return el != null && el != undefined; })}
      },
      // error => alert('Uncorrect password')
      );
    this.adminPassword = '';
  }

  confirmClose(): void {
    this.disabledPasswordAdmin = true;
    this.styleDeactivate = '';
  }

  pressDelete(i: any): void {
    // if (confirm('Do you are want to deactivate user?') === true){
      this.authService.user.subscribe(elem =>
        this.user = elem);
      this.styleDeactivate = 'pointer-events: none; opacity: 0.3;';
      this.disabledPasswordAdmin = false;
      this.indexUseToDeactivate = i + (this.numPage - 1) * this.pageSize;
    // }
  }


  clickSearchEmailUsername(): void {
    this.profileService.getSearchUser(this.searchUsername,
      this.searchEmail, this.searchRole,
      this.pageSize, this.numPage)
      .subscribe(elem => { this.elements = elem; });
  }


  usernameAndEmailOnInput(event: any): void {
    if (event.key === 'Enter') {
      this.numPage = 1;
      this.profileService.getSearchUser(this.searchUsername,
        this.searchEmail, this.searchRole,
        this.pageSize, this.numPage)
        .subscribe(elem => { this.elements = elem; });
    }
  }

  chooseSearchRole(): void {
    if (this.role === 'ALL') {
      this.searchRole = '';
    } else {
      this.searchRole = this.role;
    }
    this.numPage = 1;
    this.profileService.getSearchUser(this.searchUsername,
      this.searchEmail, this.searchRole,
      this.pageSize, this.numPage)
      .subscribe(elem => { this.elements = elem; });
  }
}
