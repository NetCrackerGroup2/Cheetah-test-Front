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
  thePageNumber: number = 1;
  thePageSize: number = 2;
  theTotalElements: number = 25;
  libraries: Library[] = [];

  constructor(private route: ActivatedRoute,
              private libraryService: LibraryService) {
  }

  ngOnInit(): void {
    this.listLibraries();
  }

  public listLibraries(): void {
    this.libraries = this.libraryService
      .getLibraryList(this.thePageNumber - 1, this.thePageSize);
  }

  public updatePageSize(pageSize: number): void {
    this.thePageSize = pageSize;
    this.thePageNumber = 1;
    this.listLibraries();
  }

}
