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

  constructor(private route: ActivatedRoute,
              private libraryService: LibraryService) {
  }

  ngOnInit(): void {
    this.listLibraries();
  }

  // private listLibraries(): void {
  //   this.libraryService.getLibraryList(this.thePageNumber - 1, this.thePageSize)
  //     .subscribe();
  // }

  private listLibraries(): void {
    this.libraries = this.libraryService
      .getLibraryList(this.thePageNumber - 1, this.thePageSize);
  }

  private updatePageSize(pageSize: number): void {
    this.thePageSize = pageSize;
    this.thePageNumber = 1;
    this.listLibraries();
  }

}
