import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LibraryService} from '../../services/library/library.service';
import {Library} from '../../models/library/library';

@Component({
  selector: 'app-library-list',
  templateUrl: './library-list.component.html',
  styleUrls: ['./library-list.component.css']
})
export class LibraryListComponent implements OnInit {
  thePageNumber = 1;
  thePageSize = 2;
  theTotalElements = 5;
  libraries: Library[] = [];

  searchMode = false;
  previousKeyword: string = null;

  constructor(private route: ActivatedRoute,
              private libraryService: LibraryService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.listLibraries();
  }

  public listLibraries(): void {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }

  }

  public updatePageSize(pageSize: number): void {
    this.thePageSize = pageSize;
    this.thePageNumber = 1;
    this.listLibraries();
  }

  private handleListProducts(): void {
    this.libraries = this.libraryService
      .getLibraryList(this.thePageNumber - 1, this.thePageSize);
    // .subscribe(data => this.libraries = data);
  }

  private handleSearchProducts(): void {
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword');

    if (this.previousKeyword !== theKeyword) {
      this.thePageNumber = 1;
    }

    this.previousKeyword = theKeyword;

    console.log(`keyword=${theKeyword}, pagenumber=${this.thePageNumber}`);

    this.libraryService.searchProductsPaginate(
      this.thePageNumber - 1, this.thePageSize,
      theKeyword).subscribe(data => this.libraries = data);
  }

  doSearch(value: string): void {
    console.log(`value=${value}`);
    this.router.navigateByUrl(`libraries/search/${value}`);
  }
}
