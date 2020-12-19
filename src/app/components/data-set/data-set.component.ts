import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DataSet} from '../../models/data-set/data-set';
import {DataSetService} from '../../services/data-set/data-set.service';
import {Subscription} from 'rxjs';
import {AuthService} from '../../services/auth/auth.service';
import {User} from '../../models/user/user';

@Component({
  selector: 'app-data-set',
  templateUrl: './data-set.component.html',
  styleUrls: ['./data-set.component.css']
})
export class DataSetComponent implements OnInit {
  user: User;
  theTestCaseId: number;
  thePageNumber = 1;
  thePageSize = 5;
  theTotalElements: number;
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
  dataSetTitle: string;
  dataSetDescription: string;
  theProjectId: number;

  constructor(private authenticationService: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private dataSetService: DataSetService) {
    this.authenticationServiceSubscription = this.authenticationService.user.subscribe(
      x => {
        this.user = x;
      }
    );
  }

  ngOnInit(): void {
    this.theTestCaseId = +this.route.snapshot.paramMap.get('id');
    this.theProjectId = +this.route.snapshot.paramMap.get('projectId');
    this.listDataSets();
  }

  listDataSets(): void {
    this.searchMode = !!this.value;

    if (this.searchMode) {
      this.handleSearchDataSets();

    } else {
      this.handleDataSets();
    }
  }

  private handleDataSets(): void {
    this.dataSetSubscription = this.dataSetService
      .getDataSets(this.thePageNumber, this.thePageSize, this.theTestCaseId)
      .subscribe(data => {
        this.datasets = data.dataSets;
        this.theTotalElements = data.totalElements;
      });
  }

  private handleSearchDataSets(): void {
    const theKeyword: string = this.value;
    if (this.previousKeyword !== theKeyword) {
      this.thePageNumber = 1;
    }

    this.previousKeyword = theKeyword;

    this.dataSetSearchSubscription = this.dataSetService.searchDataSets(
      this.thePageNumber,
      this.theTestCaseId,
      this.thePageSize,
      theKeyword)
      .subscribe(data => {
        this.datasets = data.dataSets;
        this.theTotalElements = data.totalElements;
      });
  }

  createDataSet(): void{
    const dataset1: DataSet = new DataSet();
    dataset1.title = this.dataSetTitle;
    dataset1.description = this.dataSetDescription;
    dataset1.idTestCase = this.theTestCaseId;
    this.dataSetService.createDataSet(dataset1).subscribe();
    this.listDataSets();
  }

  deleteDataSet(id: number): void {
    this.dataSetService.deleteDataSet(id).subscribe();
    this.listDataSets();
  }

  doSearch(value: string): void {
    this.value = value;
    this.listDataSets();
  }

  goEdit(dataset: DataSet):void{
    this.router.navigate(['projects', this.theProjectId, 'test-cases', this.theTestCaseId, 'data-set', 'edit-data-set'], { queryParams: { idDataSet: dataset.id, title: dataset.title } });
  }

  goBack(): void{
    this.router.navigate(['projects', this.theTestCaseId, 'test-cases']);
  }
}
