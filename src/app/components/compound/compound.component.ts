import {Component, OnDestroy, OnInit} from '@angular/core';
import {Compound} from '../../models/compound/compound';
import {AuthService} from '../../services/auth/auth.service';
import {User} from '../../models/user/user';
import {Role} from '../../models/roles/role';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {CompoundService} from '../../services/compound/compound.service';

@Component({
  selector: 'app-compound',
  templateUrl: './compound.component.html',
  styleUrls: ['./compound.component.css']
})
export class CompoundComponent implements OnInit, OnDestroy {

  user: User;
  authenticationServiceSubscription: Subscription;
  thePageNumber = 1;
  thePageSize = 5;
  theTotalElements = 0;
  compoundSearchSubscription: Subscription;
  compoundSubscription: Subscription;
  searchMode = false;
  previousKeyword: string = null;
  value = '';
  compounds: Compound[] = [];

  constructor(private authenticationService: AuthService,
              private router: Router,
              private compoundService: CompoundService) {
    this.authenticationServiceSubscription = this.authenticationService.user.subscribe(
      x => {
        this.user = x;
      }
    );
  }

  ngOnInit(): void {
    this.listCompounds();
  }


  listCompounds(): void {
    this.searchMode = !!this.value;

    if (this.searchMode) {
      this.handleSearchCompounds();

    } else {
      this.handleCompounds();
    }
  }

  private handleCompounds(): void {
    this.compoundSubscription = this.compoundService
      .getCompounds(this.thePageNumber, this.thePageSize)
      .subscribe(data => {
        this.compounds = data.compounds;
        this.theTotalElements = data.totalCompounds;
      });
  }

  private handleSearchCompounds(): void {
    const theKeyword: string = this.value;
    if (this.previousKeyword !== theKeyword) {
      this.thePageNumber = 1;
    }

    this.previousKeyword = theKeyword;

    this.compoundSearchSubscription = this.compoundService.searchCompounds(
      this.thePageNumber,
      this.thePageSize,
      theKeyword)
      .subscribe(data => {
        this.compounds = data.compounds;
        this.theTotalElements = data.totalCompounds;
      });
  }

  remove(id: number): void {
    this.compoundService.remove(id).subscribe();
    this.listCompounds();
  }

  get isAdmin(): boolean {
    return this.user && this.user.role === Role.ADMIN;
  }

  ngOnDestroy(): void {
    if (this.authenticationServiceSubscription) {
      this.authenticationServiceSubscription.unsubscribe();
    }
    if (this.compoundSubscription) {
      this.compoundSubscription.unsubscribe();
    }
    if (this.compoundSearchSubscription) {
      this.compoundSearchSubscription.unsubscribe();
    }
  }

  doSearch(value: string): void {
    this.value = value;
    this.listCompounds();
  }
}
