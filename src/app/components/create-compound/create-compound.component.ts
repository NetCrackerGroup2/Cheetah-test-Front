import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Action} from '../../models/action/action';
import {Subject, Subscription} from 'rxjs';
import {ActionService} from '../../services/action/action.service';
import {CompoundCreateDto} from '../../models/compoundDto/compound-create-dto';
import {CompoundDtoWithActions} from '../../models/compound-actions-dto/compound-dto-with-actions';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-create-compound',
  templateUrl: './create-compound.component.html',
  styleUrls: ['./create-compound.component.css']
})
export class CreateCompoundComponent implements OnInit, OnDestroy {

  successMessage: string;
  errorMessage: string;
  createCompoundForm: FormGroup;
  actions: Action[];
  addedActions: Action[] = [];
  searchTerm$ = new Subject<string>();
  @ViewChild('term') term;
  searchActionSubscription: Subscription;
  loading = false;

  constructor(private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private actionService: ActionService) {

    this.searchActionSubscription = this.actionService.search(this.searchTerm$)
      .subscribe(results => {
        this.actions = results;
      });
  }

  ngOnInit(): void {
    this.createCompoundForm = this.formBuilder.group({
      name: new FormControl('',
        [Validators.required, Validators.maxLength(100)]),
      description: new FormControl('',
        [Validators.required, Validators.maxLength(300)])
    });
  }

  get description(): any {
    return this.createCompoundForm.get('description');
  }

  get name(): any {
    return this.createCompoundForm.get('name');
  }

  onSubmit(): void {
    this.errorMessage = '';
    this.successMessage = '';
    this.loading = true;
    const actionsCreateDto: Action[] = [];
    for (const action of this.addedActions) {
      const newAction: Action = new Action();
      newAction.id = action.id;
      actionsCreateDto.push(newAction);
    }

    const compound: CompoundCreateDto =
      new CompoundCreateDto(this.name.value, this.description.value);

    const compoundWithActions: CompoundDtoWithActions =
      new CompoundDtoWithActions(compound, actionsCreateDto);

    this.actionService.createCompound(compoundWithActions)
      .pipe(take(1))
      .subscribe(
      data => {
        if (data.id) {
          this.successMessage = 'Compound has been successfully created';
          this.createCompoundForm.reset();
          this.addedActions = [];
        } else if (data === 'Entity with such signature already exists') {
          this.errorMessage = 'Entity with such name already exists';
        } else {
          this.errorMessage = 'Server error';
        }
        this.loading = false;
      });
  }

  addToList(action: Action): void {
    this.addedActions.push(action);
  }

  remove(action: Action): void {
    const index = this.addedActions.indexOf(action, 0);
    if (index > -1) {
      this.addedActions.splice(index, 1);
    }
  }

  cleanList(): void {
    this.searchTerm$.next();
    this.term.nativeElement.value = '';
    this.actions = [];
  }

  ngOnDestroy(): void {
    if (this.searchActionSubscription) {
      this.searchActionSubscription.unsubscribe();
    }
  }

}
