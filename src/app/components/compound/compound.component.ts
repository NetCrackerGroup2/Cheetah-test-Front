import {Component, OnInit} from '@angular/core';
import {Compound} from '../../models/compound/compound';
import {AuthService} from '../../services/auth/auth.service';
import {User} from '../../models/user/user';
import {Role} from '../../models/roles/role';
import {Router} from '@angular/router';
import {CompoundService} from '../../services/compound/compound.service';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-compound',
  templateUrl: './compound.component.html',
  styleUrls: ['./compound.component.css']
})
export class CompoundComponent implements OnInit {

  user: User;
  thePageNumber = 1;
  thePageSize = 5;
  theTotalElements = 0;
  searchMode = false;
  previousKeyword: string = null;
  value = '';
  compounds: Compound[] = [];

  constructor(private authenticationService: AuthService,
              private router: Router,
              private compoundService: CompoundService) {
    this.authenticationService.user
      .pipe(take(1))
      .subscribe(
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
    this.compoundService
      .getCompounds(this.thePageNumber, this.thePageSize)
      .pipe(take(1))
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

    this.compoundService.searchCompounds(
      this.thePageNumber,
      this.thePageSize,
      theKeyword)
      .pipe(take(1))
      .subscribe(data => {
        this.compounds = data.compounds;
        this.theTotalElements = data.totalCompounds;
      });
  }

  remove(id: number): void {
    this.compoundService.remove(id)
      .pipe(take(1))
      .subscribe(
        () => this.listCompounds()
      );
  }

  get isAdmin(): boolean {
    return this.user && this.user.role === Role.ADMIN;
  }

  doSearch(value: string): void {
    this.value = value;
    this.listCompounds();
  }

  view(id: number): void {
    this.router.navigate([`/general-library/compounds/${id}`]);
  }
}
