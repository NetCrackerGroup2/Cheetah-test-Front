import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ActionsAndCompoundsService} from '../../services/actions-compounds/actions-and-compounds.service';
import {DataSet} from '../../models/data-set/data-set';
import {DataSetService} from '../../services/data-set/data-set.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-data-set',
  templateUrl: './data-set.component.html',
  styleUrls: ['./data-set.component.css']
})
export class DataSetComponent implements OnInit {
  thePageNumber = 1;
  thePageSize = 5;
  theTotalElements = 0;
  dataSetId: number;
  dataSetName: string;
  isFound = true;
  dataSetSearchSubscription: Subscription;
  dataSetSubscription: Subscription;
  datasets: DataSet[] = [];
  value = '';
  searchMode = false;
  previousKeyword: string = null;

  constructor(private route: ActivatedRoute,
              private dataSetService: DataSetService,
              private router: Router,
              private actionsCompoundService: ActionsAndCompoundsService) {
  }

  ngOnInit(): void {
    this.dataSetId = +this.route.snapshot.paramMap.get('id');
    this.dataSetName = this.route.snapshot.paramMap.get('name');
  }
  private checkIfFound(): void {
    if (this.datasets?.length === 0) {
      this.isFound = false;
    }
  }

  doSearch(value: string): void {
    this.value = value;
    // this.listDataSets();
  }

  createDataSet(): void{
    this.router.navigate(['/api/data-set']);
  }
}
