import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subject, Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../services/user/user.service';
import {UserDto} from '../../models/user/dto/user-dto';
import {take} from 'rxjs/operators';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {Project} from '../../models/project/entity/project';
import {ProjectService} from '../../services/project/project.service';

@Component({
  selector: 'app-edit-watchers',
  templateUrl: './edit-watchers.component.html',
  styleUrls: ['./edit-watchers.component.css']
})
export class EditWatchersComponent implements OnInit, OnDestroy {
  successMessage: string;
  errorMessage: string;
  loading = false;
  project: Project;
  projectDescription: string;
  watchers: UserDto[] = [];
  availableWatchers: UserDto[] = [];
  projectId: number;
  searchWatchersSubscription: Subscription;
  searchTerm$ = new Subject<string>();
  @ViewChild('term') term;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private userService: UserService,
              private projectService: ProjectService) {

    this.projectId = +this.route.snapshot.paramMap.get('projectId');

    this.searchWatchersSubscription = this.userService.search(this.searchTerm$)
      .subscribe(results => {
        this.availableWatchers = results;
      });
  }

  ngOnInit(): void {
    this.projectService.getProjectById(this.projectId)
      .pipe(take(1))
      .subscribe(
        (data) => {
          this.project = data;
        }
      );

    this.listWatchers();
  }

  private listWatchers(): void {
    this.userService.getWatchersByProjectId(this.projectId)
      .pipe(take(1))
      .subscribe(
        data => {
          this.watchers = data;
        }
      );
  }

  drop($event: CdkDragDrop<UserDto[]>): void {
    moveItemInArray(this.watchers, $event.previousIndex, $event.currentIndex);
  }

  addToList(user: UserDto): void {
    if (!this.containsObject(user, this.watchers)) {
      this.watchers.push(user);
      this.errorMessage = '';
    } else {
      this.errorMessage = 'User already added.';
    }
  }

  save(): void {
    this.loading = true;
    this.successMessage = '';
    this.errorMessage = '';

    const ids: number[] = [];
    for (const watcher of  this.watchers) {
      ids.push(watcher.id);
    }

    this.userService.save(this.projectId, ids)
      .pipe(take(1))
      .subscribe(
        (data) => {
          if (data.ids) {
            this.successMessage = 'Watchers has been successfully saved';
          } else {
            this.errorMessage = 'Error';
          }
          this.loading = false;
        }
      );
  }

  containsObject(obj: UserDto, list: UserDto[]): boolean {
    let i;
    for (i = 0; i < list.length; i++) {
      if (list[i].email === obj.email) {
        return true;
      }
    }
    return false;
  }

  ngOnDestroy(): void {
    this.searchWatchersSubscription.unsubscribe();
  }

  cleanList(): void {
    this.searchTerm$.next();
    this.term.nativeElement.value = '';
    this.availableWatchers = [];
  }

  remove(user: UserDto): void {
    const index = this.watchers.indexOf(user, 0);
    if (index > -1) {
      this.watchers.splice(index, 1);
    }
  }
}
