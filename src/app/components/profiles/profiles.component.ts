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

  isAdmin = true;

  isDeactivate = false;

  textAgreeConfirmPanel: string;

  pageChange(page: number): void {
    this.profileService.getSearchUser(this.searchUsername,
        this.searchEmail, this.searchRole,
        this.pageSize, page)
        .subscribe(elem => { this.elements = elem; });
  }

  constructor(private profileService: ProfileService,
              private authService: AuthService) {
    this.elements = {
      users: [],
      totalElements: 8
    };
    if (authService.userValue.role === 'ADMIN'){
      this.isAdmin = false;
    }
    this.profileService.getSearchUser(this.searchUsername,
      this.searchEmail, this.searchRole,
      this.pageSize, 1)
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
    if (this.textOnButtonUpdate[i] === 'Edit') {
      if (confirm('Do you are want to deactivate user?') === true){
        // this.disabledPersonalData[i] = !this.disabledPersonalData[i];
        this.isDeactivate = false;
        this.authService.user.subscribe(elem =>
          this.user = elem);
        this.textAgreeConfirmPanel = 'Confirm';
        this.styleDeactivate = 'pointer-events: none; opacity: 0.3;';
        this.disabledPasswordAdmin = false;
        this.indexUseToDeactivate = i;

      }
    } else {
      const index = i;
      this.profileService.editUser(this.elements.users[index].name,
        this.elements.users[index].email,
        this.elements.users[index].role,
        this.saveLastEmailEdit);
      this.textOnButtonUpdate[i] = 'Edit';
      this.disabledPersonalData[i] = !this.disabledPersonalData[i];
    }
  }

  confirmAdminPassword(): void {
    this.disabledPasswordAdmin = true;
    this.styleDeactivate = '';
    const check: LoginDto = new LoginDto(this.user.email, this.adminPassword);
    this.authService.login(check).subscribe(
        elem => {
          if (elem && this.isDeactivate === true) {
            this.profileService.deactivateUser(this.elements
              .users[this.indexUseToDeactivate].email);
            delete this.elements.users[this.indexUseToDeactivate];
            this.elements.users = this.elements.users.filter(el => {
              return el != null;
            });
          } else {
              this.disabledPersonalData[this.indexUseToDeactivate] = !this.disabledPersonalData[this.indexUseToDeactivate];
              this.saveLastEmailEdit = this.elements.users[this.indexUseToDeactivate].email;
              this.textOnButtonUpdate[this.indexUseToDeactivate] = 'Save';
            }
        },
        error => alert('Incorrect password'));
    this.adminPassword = '';
  }

  confirmClose(): void {
    this.disabledPasswordAdmin = true;
    this.styleDeactivate = '';
  }

  pressDelete(i: any): void {
    if (confirm('Do you are want to deactivate user?') === true){
      this.textAgreeConfirmPanel = 'Deactivate';
      this.isDeactivate = true;
      this.authService.user.subscribe(elem =>
        this.user = elem);
      this.styleDeactivate = 'pointer-events: none; opacity: 0.3;';
      this.disabledPasswordAdmin = false;
      this.indexUseToDeactivate = i;
    }
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
