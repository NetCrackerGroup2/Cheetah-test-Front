import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProjectService} from '../../services/project/project.service';
import {Project} from '../../models/project/project';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  thePageNumber = 1;
  thePageSize = 5;
  theTotalElements = 0;
  projects: Project[] = [];
  value = '';
  id = 0;
  inactive = 'inactive';

  searchMode = false;
  archiveMode = false;
  previousKeyword: string = null;

  constructor(private route: ActivatedRoute,
              private projectService: ProjectService) {
  }

  ngOnInit(): void {
    this.listProjects();
  }

  public listProjects(): void {
    this.searchMode = !!this.value;

    console.log(this.searchMode);
    if (this.searchMode) {
      this.handleSearchProducts();

    } else if (this.archiveMode){         //TODO
      this.handleArchiveProducts();
    } else{
      this.handleListProducts();
    }

  }

  private handleListProducts(): void {
    this.projects = [];
    this.projectService
      .getProjectList(this.thePageNumber, this.thePageSize)
      .subscribe(this.processResult());
  }

  private handleSearchProducts(): void {
    const theKeyword: string = this.value;
    if (this.previousKeyword !== theKeyword) {
      this.thePageNumber = 1;
    }

    this.previousKeyword = theKeyword;

    console.log(`keyword=${theKeyword}, pagenumber=${this.thePageNumber}`);

    this.projectService.searchProductsPaginate(
      this.thePageNumber,
      this.thePageSize,
      theKeyword)
      .subscribe(data => {
        this.projects = data.list;
        this.theTotalElements = +data.totalElements;
        if (this.thePageNumber * this.thePageSize >= this.theTotalElements
          && this.theTotalElements > this.thePageSize) {
          this.projects = this.projects.slice(this.thePageSize * (this.thePageNumber - 1));
        }
      });
  }

  private handleArchiveProducts(): void {
    const inactive: string = this.inactive;
    this.projectService.archiveProductsPaginate(
      this.thePageNumber,
      this.thePageSize,
      inactive).subscribe(data => {
      this.projects = data.list;
      this.theTotalElements = +data.totalElements;
      if (this.thePageNumber * this.thePageSize >= this.theTotalElements
        && this.theTotalElements > this.thePageSize) {
        this.projects = this.projects.slice(this.thePageSize * (this.thePageNumber - 1));
      }
    });
  }

  doSearch(value: string): void {
    this.value = value;
    this.listProjects();
  }

  goToArchive(): void{
    this.listProjects();
  }

  doEdit(id: number): void {          //todo
    this.id = id;
    this.projectService.openProjectToEdit(id);
  }

  doArchive(id: number): void {       //todo
    this.id = id;
    this.projectService.archiveProject(id);
  }

  private processResult(): any {
    return data => {
      this.projects = data.list;
      this.theTotalElements = +data.totalElements;
      if (this.thePageNumber * this.thePageSize >= this.theTotalElements
        && this.theTotalElements > this.thePageSize) {
        this.projects = this.projects.slice(this.thePageSize * (this.thePageNumber - 1));
      }
    };

  }
}
