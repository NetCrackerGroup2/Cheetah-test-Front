import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {DataSet} from '../../models/data-set/data-set';
import {DataSetService} from '../../services/data-set/data-set.service';
import {Subscription} from 'rxjs';
import {AuthService} from '../../services/auth/auth.service';
import {CompoundService} from '../../services/compound/compound.service';
import {User} from '../../models/user/user';

@Component({
  selector: 'app-data-set',
  templateUrl: './data-set.component.html',
  styleUrls: ['./data-set.component.css']
})
export class DataSetComponent implements OnInit {
  user: User;
  thePageNumber = 1;
  thePageSize = 5;
  theTotalElements = 0;
  dataSetId: number;
  dataSetName: string;
  isFound = true;
  authenticationServiceSubscription: Subscription;
  dataSetSearchSubscription: Subscription;
  dataSetSubscription: Subscription;
  datasets: DataSet[] = [];
  dataSet: DataSet = null;
  value = '';
  searchMode = false;
  previousKeyword: string = null;

  constructor(private authenticationService: AuthService,
              private router: Router,
              private dataSetService: DataSetService) {
    this.authenticationServiceSubscription = this.authenticationService.user.subscribe(
      x => {
        this.user = x;
      }
    );
  }

  ngOnInit(): void {
  }
  private checkIfFound(): void {
    if (this.datasets?.length === 0) {
      this.isFound = false;
    }
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
    this.dataSetSubscription = this.dataSetService
      .getDataSets(this.thePageNumber, this.thePageSize)
      .subscribe(data => {
        this.datasets = data.dataSets;
        this.theTotalElements = data.totalDataSets;
      });
  }

  private handleSearchCompounds(): void {
    const theKeyword: string = this.value;
    if (this.previousKeyword !== theKeyword) {
      this.thePageNumber = 1;
    }

    this.previousKeyword = theKeyword;

    this.dataSetSearchSubscription = this.dataSetService.searchDataSets(
      this.thePageNumber,
      this.thePageSize,
      theKeyword)
      .subscribe(data => {
        this.datasets = data.dataSets;
        this.theTotalElements = data.totalDataSets;
      });
  }

  //////////////////////////////////////////////////////////////

  createDataSet(): void{

  }

  deleteDataSet(id: number): void {
    this.dataSetService.deleteDataSet(id).subscribe();
    this.listCompounds();
  }
}
