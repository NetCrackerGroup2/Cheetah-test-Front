import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LibraryService} from '../../services/library/library.service';
import {Library} from '../../models/library/library';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-library-list',
  templateUrl: './library-list.component.html',
  styleUrls: ['./library-list.component.css']
})
export class LibraryListComponent implements OnInit, OnDestroy {
  thePageNumber = 1;
  thePageSize = 5;
  theTotalElements = 0;
  libraries: Library[] = [];
  value = '';
  librarySearchSubscription: Subscription;
  librarySubscription: Subscription;
  searchMode = false;
  previousKeyword: string = null;
  isFound = true;
  isRefreshed = false;

  constructor(private route: ActivatedRoute,
              private libraryService: LibraryService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.listLibraries();
  }

  public listLibraries(): void {
    this.searchMode = !!this.value;

    if (this.searchMode) {
      this.handleSearchProducts();

    } else {
      this.handleListProducts();
    }

  }

  private handleListProducts(): void {
    this.libraries = [];
    this.librarySubscription = this.libraryService
      .getLibraryList(this.thePageNumber, this.thePageSize)
      .subscribe(data => {
        this.libraries = data.list;
        this.theTotalElements = data.totalElements;
        if (this.thePageNumber * this.thePageSize >= this.theTotalElements
          && this.theTotalElements > this.thePageSize) {
          this.libraries = this.libraries.slice(this.thePageSize * (this.thePageNumber - 1));
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

    this.librarySearchSubscription = this.libraryService.searchProductsPaginate(
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

  doSearch(value: string): void {
    this.value = value;
    this.listLibraries();
  }

  edit(library: Library): void {
    this.router.navigate([`libraries/edit/${library.id}`]);
    this.libraryService.libraryOnEdit = library;
  }

  createNew(): void {
    this.router.navigate(['libraries/edit']);
  }

  ngOnDestroy(): void {
    if (this.librarySearchSubscription) {
      this.librarySearchSubscription.unsubscribe();
    }
    if (this.librarySubscription) {
      this.librarySubscription.unsubscribe();
    }
  }

  goToLibrary(library: Library): void {
    this.router.navigate([`library/${library.id}/${library.name}`]);
  }

  private checkIfFound(): void {
    if (this.libraries?.length === 0) {
      this.isFound = false;
    }
  }
}
