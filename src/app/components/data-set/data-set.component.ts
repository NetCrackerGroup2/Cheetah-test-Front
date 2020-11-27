import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ActionsAndCompoundsService} from '../../services/actions-compounds/actions-and-compounds.service';
import {Library} from '../../models/library/library';
import {DataSet} from '../../models/data-set/data-set';
import {LibraryService} from '../../services/library/library.service';
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
              private libraryService: LibraryService,
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
    this.listDataSets();
  }

  public listDataSets(): void {
    this.searchMode = !!this.value;

    if (this.searchMode) {
      this.handleSearchProducts();

    } else {
      this.handleListProducts();
    }

  }

  private handleListProducts(): void {
    this.datasets = [];
    this.dataSetSearchSubscription = this.libraryService//
      .getLibraryList(this.thePageNumber, this.thePageSize)
      .subscribe(data => {
        this.datasets = data.list;
        this.theTotalElements = data.totalElements;
        if (this.thePageNumber * this.thePageSize >= this.theTotalElements
          && this.theTotalElements > this.thePageSize) {
          this.datasets = this.datasets.slice(this.thePageSize * (this.thePageNumber - 1));
        }
        this.checkIfFound();
      });
  }

  private handleSearchProducts(): void {
    const theKeyword: string = this.value;
    if (this.previousKeyword !== theKeyword) {
      this.thePageNumber = 1;
    }

    this.previousKeyword = theKeyword;
//
    this.dataSetSearchSubscription = this.libraryService.searchProductsPaginate(
      this.thePageNumber,
      this.thePageSize,
      theKeyword)
      .subscribe(data => {
        this.libraries = data.list;
        this.theTotalElements = data.totalElements;
        if (this.thePageNumber * this.thePageSize >= this.theTotalElements
          && this.theTotalElements > this.thePageSize) {
          this.libraries = this.libraries.slice(this.thePageSize * (this.thePageNumber - 1));
        }
      });
  }

  edit(library: Library): void {
    this.router.navigate([`libraries/edit/${library.id}`]);
    this.libraryService.libraryOnEdit = library;
  }

  createNew(): void {
    this.router.navigate(['libraries/edit']);
  }
}
