import {Component, OnDestroy, OnInit} from '@angular/core';

import {Action} from '../../models/action/action';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {ActionService} from '../../services/action/action.service';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.css']
})
export class ActionComponent implements OnInit, OnDestroy {
  thePageNumber = 1;
  thePageSize = 5;
  theTotalElements = 0;
  actionSearchSubscription: Subscription;
  actionSubscription: Subscription;
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
    this.actionSubscription = this.actionService
      .getActions(this.thePageNumber, this.thePageSize)
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

    this.actionSearchSubscription = this.actionService.searchActions(
      this.thePageNumber,
      this.thePageSize,
      theKeyword)
      .subscribe(data => {
        this.actions = data.list;
        this.theTotalElements = data.totalElements;
      });
  }

  ngOnDestroy(): void {
    if (this.actionSubscription) {
      this.actionSubscription.unsubscribe();
    }
    if (this.actionSearchSubscription) {
      this.actionSearchSubscription.unsubscribe();
    }
  }

  doSearch(value: string): void {
    this.value = value;
    this.listActions();
  }
}
