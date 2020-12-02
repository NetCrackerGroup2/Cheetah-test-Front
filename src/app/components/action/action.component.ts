import {Component, OnInit} from '@angular/core';

import {Action} from '../../models/action/action';
import {Router} from '@angular/router';
import {ActionService} from '../../services/action/action.service';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.css']
})
export class ActionComponent implements OnInit {
  thePageNumber = 1;
  thePageSize = 5;
  theTotalElements = 0;
  searchMode = false;
  previousKeyword: string = null;
  value = '';
  actions: Action[] = [];

  constructor(private router: Router,
              private actionService: ActionService) {
  }

  ngOnInit(): void {
    this.listActions();
  }

  edit(id: number, description: string): void {
    this.router.navigate([`/edit-action/${id}/${description}`]);
  }

  listActions(): void {
    this.searchMode = !!this.value;

    if (this.searchMode) {
      this.handleSearchActions();
    } else {
      this.handleActions();
    }
  }

  private handleActions(): void {
    this.actionService
      .getActions(this.thePageNumber, this.thePageSize)
      .pipe(take(1))
      .subscribe(data => {
        this.actions = data.list;
        this.theTotalElements = data.totalElements;
      });
  }

  private handleSearchActions(): void {
    const theKeyword: string = this.value;
    if (this.previousKeyword !== theKeyword) {
      this.thePageNumber = 1;
    }

    this.previousKeyword = theKeyword;

    this.actionService.searchActions(
      this.thePageNumber,
      this.thePageSize,
      theKeyword)
      .pipe(take(1))
      .subscribe(data => {
        this.actions = data.list;
        this.theTotalElements = data.totalElements;
      });
  }

  doSearch(value: string): void {
    this.value = value;
    this.listActions();
  }
}
