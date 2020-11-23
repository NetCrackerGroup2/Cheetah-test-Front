import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {LibraryService} from '../../services/library/library.service';
import {ActionsAndCompoundsService} from '../../services/actions-compounds/actions-and-compounds.service';
import {Library} from '../../models/library/library';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit, OnDestroy {
  thePageNumber = 1;
  thePageSize = 5;
  theTotalElements = 0;
  actionsAndCompounds = [];
  librarySearchSubscription: Subscription;
  librarySubscription: Subscription;
  searchMode = false;
  previousKeyword: string = null;
  value = '';
  libraryId: number;
  libraryName: string;
  library: Library;
  isFound = true;

  constructor(private route: ActivatedRoute,
              private libraryService: LibraryService,
              private router: Router,
              private actionsCompoundService: ActionsAndCompoundsService) {
  }

  ngOnInit(): void {
    this.libraryId = +this.route.snapshot.paramMap.get('id');
    this.libraryName = this.route.snapshot.paramMap.get('name');
    console.log(this.libraryId);
    console.log(this.libraryName);
    this.listActionsAndCompounds();
  }


  listActionsAndCompounds(): void {
    this.searchMode = !!this.value;

    if (this.searchMode) {
      this.handleSearchActionsAndCompounds();

    } else {
      this.handleActionsAndCompounds();
    }
  }

  private handleActionsAndCompounds(): void {
    this.actionsAndCompounds = [];
    this.librarySubscription = this.librarySubscription = this.actionsCompoundService
      .getActionsAndCompoundsList(this.thePageNumber, this.thePageSize, this.libraryId)
      .subscribe(data => {
        this.actionsAndCompounds = data.list;
        this.theTotalElements = data.totalElements;
        if (this.thePageNumber * this.thePageSize >= this.theTotalElements
          && this.theTotalElements > this.thePageSize) {
          this.actionsAndCompounds = this.actionsAndCompounds.slice(this.thePageSize * (this.thePageNumber - 1));
        }
        this.checkIfFound();
      });
  }

  private handleSearchActionsAndCompounds(): void {
    const theKeyword: string = this.value;
    if (this.previousKeyword !== theKeyword) {
      this.thePageNumber = 1;
    }

    this.previousKeyword = theKeyword;

    console.log(`keyword=${theKeyword}, pagenumber=${this.thePageNumber}`);

    this.librarySearchSubscription = this.actionsCompoundService.searchActionsAndCompoundsPaginate(
      this.thePageNumber,
      this.thePageSize,
      theKeyword,
      this.libraryId)
      .subscribe(data => {
        this.actionsAndCompounds = data.list;
        this.theTotalElements = data.totalElements;
        if (this.thePageNumber * this.thePageSize >= this.theTotalElements
          && this.theTotalElements > this.thePageSize) {
          this.actionsAndCompounds = this.actionsAndCompounds.slice(this.thePageSize * (this.thePageNumber - 1));
        }
      });
  }

  doSearch(value: string): void {
    this.value = value;
    this.listActionsAndCompounds();
  }

  createCompound(): void {
    this.router.navigate(['library-create-compound']);
  }

  delete(): void {

  }

  ngOnDestroy(): void {
    if (this.librarySubscription) {
      this.librarySubscription.unsubscribe();
    }
    if (this.librarySearchSubscription) {
      this.librarySearchSubscription.unsubscribe();
    }
  }

  private checkIfFound(): void {
    if (this.actionsAndCompounds?.length === 0) {
      this.isFound = false;
    }
  }
}
