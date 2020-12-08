import {Component, OnInit} from '@angular/core';
import {Project} from '../../models/project/entity/project';
import {Router} from '@angular/router';
import {ProjectService} from '../../services/project/project.service';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  project: Project;
  thePageNumber = 1;
  thePageSize = 5;
  theTotalElements = 0;
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
    this.projectService
      .getProjects(this.thePageNumber, this.thePageSize)
      .pipe(take(1))
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

    this.projectService.findProjectsByTitle(
      this.thePageNumber,
      this.thePageSize,
      theKeyword)
      .pipe(take(1))
      .subscribe(data => {
        this.projects = data.projects;
        this.theTotalElements = data.totalElements;
      });
  }

  doSearch(value: string): void {
    this.value = value;
    this.listProjects();
  }

  archive(id: number): void {
    this.projectService.archive(id)
      .pipe(take(1))
      .subscribe(
        () => {
          this.listProjects();
        }
      );
  }

  edit(id: number): void {
    this.router.navigate([`projects/edit-project/${id}`]);
  }

  showTestCases(id: number): void {
    this.router.navigate(['projects', id, 'test-cases']);
  }
}
