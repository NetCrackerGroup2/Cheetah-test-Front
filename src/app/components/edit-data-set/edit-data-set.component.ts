import { Component, OnInit } from '@angular/core';
import {DataSet} from '../../models/data-set/data-set';
import {AuthService} from '../../services/auth/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DataSetService} from '../../services/data-set/data-set.service';
import {Subscription} from 'rxjs';
import {User} from '../../models/user/user';
import {Parameter} from '../../models/parameter/parameter';
import {EditDataSetService} from '../../services/edit-data-set/edit-data-set.service';

@Component({
  selector: 'app-edit-data-set',
  templateUrl: './edit-data-set.component.html',
  styleUrls: ['./edit-data-set.component.css']
})
export class EditDataSetComponent implements OnInit {
  user: User;
  dataSetId: number;
  dataSetTitle: string;
  theTestCaseId: number;
  isFound = true;
  authenticationServiceSubscription: Subscription;
  parametersSearchSubscription: Subscription;
  parametersSubscription: Subscription;
  value = '';
  searchMode = false;
  previousKeyword: string = null;
  parameterValue: string;
  parameterType: string;
  thePageNumber = 1;
  thePageSize = 5;
  theTotalElements: number;
  parameters: Parameter[] = [];
  parameter: Parameter = null;

  constructor(private authenticationService: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private parametersService: EditDataSetService) {
    this.authenticationServiceSubscription = this.authenticationService.user.subscribe(
      x => {
        this.user = x;
      }
    );
  }

  ngOnInit(): void {
    this.dataSetId = +this.route.snapshot.paramMap.get('id');
    this.theTestCaseId = +this.route.snapshot.paramMap.get('idTestCase');
    this.dataSetTitle = this.route.snapshot.paramMap.get('title');
    this.listParameters();
  }

  doSearch(value: string): void {
    this.value = value;
    this.listParameters();
  }

  listParameters(): void {
    this.searchMode = !!this.value;

    if (this.searchMode) {
      this.handleSearchDataSets();

    } else {
      this.handleDataSets();
    }
  }

  createParameter(): void{
    const parameter: Parameter = new Parameter();
    parameter.value = this.parameterValue;
    parameter.type = this.parameterType;
    parameter.idDataSet = this.dataSetId;
    this.parametersService.createParameter(parameter).subscribe();
    this.listParameters();
  }

  private handleDataSets(): void {
    this.parametersSubscription = this.parametersService
      .getParameters(this.thePageNumber, this.thePageSize, this.dataSetId, this.parameter.type)
      .subscribe(data => {
        this.parameters = data.parameters;
        this.theTotalElements = data.totalElements;
      });
  }

  private handleSearchDataSets(): void {
    const theKeyword: string = this.value;
    if (this.previousKeyword !== theKeyword) {
      this.thePageNumber = 1;
    }

    this.previousKeyword = theKeyword;

    this.parametersSubscription = this.parametersService.searchParameters(
      this.thePageNumber,
      this.theTestCaseId,
      this.thePageSize,
      theKeyword)
      .subscribe(data => {
        this.parameters = data.parameters;
        this.theTotalElements = data.totalElements;
      });
  }

  backToDataSet(): string{
    return `/data-set/${this.theTestCaseId}`;
  }

  deleteParameter(id: number): void{
    this.parametersService.deleteParameter(id).subscribe();
    this.listParameters();
  }

}
