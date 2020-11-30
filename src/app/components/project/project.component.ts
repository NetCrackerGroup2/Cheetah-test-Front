import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Project} from '../../models/project/entity/project';
import {Router} from '@angular/router';
import {ProjectService} from '../../services/project/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit, OnDestroy {
  project: Project;
  thePageNumber = 1;
  thePageSize = 5;
  theTotalElements = 0;
  projectSearchSubscription: Subscription;
  projectSubscription: Subscription;
  archiveSubscription: Subscription;
  searchMode = false;
  previousKeyword: string = null;
  value = '';
  projects: Project[] = [];

  constructor(private router: Router,
              private projectService: ProjectService) {
  }

  ngOnInit(): void {
    this.listProjects();
  }

  listProjects(): void {
    this.searchMode = !!this.value;

    if (this.searchMode) {
      this.handleSearchProjects();

    } else {
      this.handleProjects();
    }
  }

  private handleProjects(): void {
    this.projectSubscription = this.projectService
      .getProjects(this.thePageNumber, this.thePageSize)
      .subscribe(data => {
        this.projects = data.projects;
        this.theTotalElements = data.totalElements;
      });
  }

  private handleSearchProjects(): void {
    const theKeyword: string = this.value;
    if (this.previousKeyword !== theKeyword) {
      this.thePageNumber = 1;
    }

    this.previousKeyword = theKeyword;

    this.projectSearchSubscription = this.projectService.findProjectsByTitle(
      this.thePageNumber,
      this.thePageSize,
      theKeyword)
      .subscribe(data => {
        this.projects = data.projects;
        this.theTotalElements = data.totalElements;
      });
  }

  ngOnDestroy(): void {
    if (this.projectSubscription) {
      this.projectSubscription.unsubscribe();
    }
    if (this.projectSearchSubscription) {
      this.projectSearchSubscription.unsubscribe();
    }
    if (this.archiveSubscription) {
      this.archiveSubscription.unsubscribe();
    }
  }

  doSearch(value: string): void {
    this.value = value;
    this.listProjects();
  }

  archive(id: number): void {
    this.projectService.archive(id).subscribe();
    this.listProjects();
  }
}
