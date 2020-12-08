import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Action} from '../../models/action/action';
import {ActivatedRoute, Router} from '@angular/router';
import {ActionService} from '../../services/action/action.service';
import {take} from 'rxjs/operators';
import {Subject, Subscription} from 'rxjs';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {Compound} from '../../models/compound/compound';

@Component({
  selector: 'app-actions-in-compound',
  templateUrl: './actions-in-compound.component.html',
  styleUrls: ['./actions-in-compound.component.css']
})
export class ActionsInCompoundComponent implements OnInit, OnDestroy {
  successMessage: string;
  errorMessage: string;
  loading = false;
  compoundTitle: string;
  compoundDescription: string;
  actions: Action[] = [];
  availableActions: Action[] = [];
  compoundId: number;
  subscription: Subscription;
  searchActionSubscription: Subscription;
  searchTerm$ = new Subject<string>();
  @ViewChild('term') term;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private actionsService: ActionService) {

    this.searchActionSubscription = this.actionsService.search(this.searchTerm$)
      .subscribe(results => {
        this.availableActions = results;
      });
  }

  ngOnInit(): void {
    this.compoundId = +this.route.snapshot.paramMap.get('id');
    this.subscription = this.route
      .queryParams
      .subscribe(params => {
        this.compoundTitle = params.compoundTitle || '';
        this.compoundDescription = params.compoundDescription || '';
      });

    this.listActions();
  }

  private listActions(): void {
    this.actionsService.getActionsByCompoundId(this.compoundId)
      .pipe(take(1))
      .subscribe(
        data => {
          this.actions = data;
        }
      );
  }


  addToList(action: Action): void {
    this.actions.push(action);
  }


  drop($event: CdkDragDrop<Action[]>): void {
    moveItemInArray(this.actions, $event.previousIndex, $event.currentIndex);
  }

  saveOrder(): void {
    this.loading = true;
    this.successMessage = '';
    this.errorMessage = '';
    const compound: Compound = new Compound();
    compound.id = this.compoundId;
    compound.title = this.compoundTitle;
    compound.description = this.compoundDescription;

    this.actionsService.saveOrder(compound, this.actions)
      .pipe(take(1))
      .subscribe(
        (data) => {
          console.log(data);
          if (data.id) {
            this.successMessage = 'Order has been successfully saved';
          } else {
            this.errorMessage = 'Error';
          }
          this.loading = false;
        }
      );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.searchActionSubscription.unsubscribe();
  }

  cleanList(): void {
    this.searchTerm$.next();
    this.term.nativeElement.value = '';
    this.availableActions = [];
  }

  remove(action: Action): void {
    const index = this.actions.indexOf(action, 0);
    if (index > -1) {
      this.actions.splice(index, 1);
    }
  }
}
