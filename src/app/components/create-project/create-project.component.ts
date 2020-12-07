import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Subject, Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {ProjectService} from '../../services/project/project.service';
import {take} from 'rxjs/operators';
import {ProjectDto} from '../../models/project/dto/project-dto';
import {ProjectDtoWithUserIds} from '../../models/project/project-dto-with-user-ids/project-dto-with-user-ids';
import {UserDto} from '../../models/user/dto/user-dto';
import {Project} from '../../models/project/entity/project';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit, OnDestroy {
  successMessage: string;
  errorMessage: string;
  createProjectForm: FormGroup;
  users: UserDto[];
  addedUsers: UserDto[] = [];
  searchTerm$ = new Subject<string>();
  searchUserSubscription: Subscription;
  @ViewChild('term') term;
  loading = false;
  isEdit = false;
  projectId: number;
  project: Project = new Project();

  constructor(private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private projectService: ProjectService) {

    this.searchUserSubscription = this.projectService.search(this.searchTerm$)
      .subscribe(results => {
        this.users = results;
      });
  }

  ngOnInit(): void {
    this.isEdit = this.route.snapshot.paramMap.has('id');

    if (this.isEdit) {
      this.projectId = +this.route.snapshot.paramMap.get('id');
      this.projectService.getProjectById(this.projectId).subscribe(
        data => {
          this.title.setValue(data.title);
          this.link.setValue(data.link);
        }
      );
    }

    this.createProjectForm = this.formBuilder.group({
      title: new FormControl('',
        [Validators.required,
          Validators.maxLength(100),
          Validators.minLength(3)]),
      link: new FormControl('',
        [Validators.required,
          Validators.maxLength(300),
          Validators.minLength(3)])
    });
  }

  get title(): any {
    return this.createProjectForm.get('title');
  }

  get link(): any {
    return this.createProjectForm.get('link');
  }

  onSubmit(): void {
    this.errorMessage = '';
    this.successMessage = '';
    this.loading = true;
    const userDtos: number[] = [];
    for (const user of this.addedUsers) {
      userDtos.push(user.id);
    }

    if (!this.isEdit) {
      const projectDto: ProjectDto =
        new ProjectDto(this.title.value, this.link.value);

      const projectDtoWithUserIds: ProjectDtoWithUserIds =
        new ProjectDtoWithUserIds(projectDto, userDtos);

      this.projectService.create(projectDtoWithUserIds)
        .pipe(take(1))
        .subscribe(
          data => {
            if (data.message === 'A new project has been created successfully!') {
              this.successMessage = 'A new project has been created successfully!';
              this.createProjectForm.reset();
              this.addedUsers = [];
            } else {
              this.errorMessage = 'Invalid Input';
            }
            this.loading = false;
          });
    } else {
      const project: Project = new Project();
      project.id = this.projectId;
      project.title = this.title.value;
      project.link = this.link.value;
      this.projectService.update(project)
        .pipe(take(1))
        .subscribe(
        data => {
          if (data.message === 'The project has been updated!') {
            this.successMessage = 'The project has been updated!';
            this.createProjectForm.reset();
            this.addedUsers = [];
          } else {
            this.errorMessage = 'Invalid Input';
          }
          this.loading = false;
        }
      );
    }
  }

  addToList(user: UserDto): void {
    this.addedUsers.push(user);
  }

  remove(user: UserDto): void {
    const index = this.addedUsers.indexOf(user, 0);
    if (index > -1) {
      this.addedUsers.splice(index, 1);
    }
  }

  cleanList(): void {
    if (!this.isEdit) {
      this.searchTerm$.next();
      this.term.nativeElement.value = '';
      this.users = [];
    }
  }

  ngOnDestroy(): void {
    if (this.searchUserSubscription) {
      this.searchUserSubscription.unsubscribe();
    }
  }

}
