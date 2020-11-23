import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {LibraryService} from '../../services/library/library.service';
import {Library} from '../../models/library/library';

@Component({
  selector: 'app-library-list',
  templateUrl: './library-list.component.html',
  styleUrls: ['./library-list.component.css']
})
export class LibraryListComponent implements OnInit {
  thePageNumber = 1;
  thePageSize = 5;
  theTotalElements = 0;
  libraries: Library[] = [];
  value = '';

  searchMode = false;
  previousKeyword: string = null;

  constructor(private route: ActivatedRoute,
              private libraryService: LibraryService) {
  }

  ngOnInit(): void {
    this.listLibraries();
  }

  public listLibraries(): void {
    this.searchMode = !!this.value;

    console.log(this.searchMode);
    if (this.searchMode) {
      this.handleSearchProducts();

    } else {
      this.handleListProducts();
    }

  }

  private handleListProducts(): void {
    this.libraries = [];
    this.libraryService
      .getLibraryList(this.thePageNumber, this.thePageSize)
      .subscribe(this.processResult());
  }

  private handleSearchProducts(): void {
    const theKeyword: string = this.value;
    if (this.previousKeyword !== theKeyword) {
      this.thePageNumber = 1;
    }

    this.previousKeyword = theKeyword;

    console.log(`keyword=${theKeyword}, pagenumber=${this.thePageNumber}`);

    this.libraryService.searchProductsPaginate(
      this.thePageNumber,
      this.thePageSize,
      theKeyword)
      .subscribe(data => {
        this.libraries = data.list;
        this.theTotalElements = +data.totalElements;
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

  private processResult(): any {
    return data => {
      this.libraries = data.list;
      this.theTotalElements = +data.totalElements;
      if (this.thePageNumber * this.thePageSize >= this.theTotalElements
        && this.theTotalElements > this.thePageSize) {
        this.libraries = this.libraries.slice(this.thePageSize * (this.thePageNumber - 1));
      }
    };

  }
}
