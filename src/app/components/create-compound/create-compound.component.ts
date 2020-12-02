import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Action} from '../../models/action/action';
import {Subject} from 'rxjs';
import {ActionService} from '../../services/action/action.service';
import {ActionCreateDto} from '../../models/action-create-dto/action-create-dto';
import {CompoundCreateDto} from '../../models/compoundDto/compound-create-dto';
import {CompoundDtoWithActions} from '../../models/compound-actions-dto/compound-dto-with-actions';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-create-compound',
  templateUrl: './create-compound.component.html',
  styleUrls: ['./create-compound.component.css']
})
export class CreateCompoundComponent implements OnInit {
  successMessage: string;
  errorMessage: string;
  createCompoundForm: FormGroup;
  actions: Action[];
  addedActions: Action[] = [];
  searchTerm$ = new Subject<string>();
  @ViewChild('term') term;
  loading = false;

  constructor(private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private actionService: ActionService) {

    this.actionService.search(this.searchTerm$)
      .pipe(take(1))
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
    const actionsCreateDto: ActionCreateDto[] = [];
    for (const action of this.addedActions) {
      actionsCreateDto.push(new ActionCreateDto(action.id));
    }

    const compound: CompoundCreateDto =
      new CompoundCreateDto(this.name.value, this.description.value);

    const compoundWithActions: CompoundDtoWithActions =
      new CompoundDtoWithActions(compound, actionsCreateDto);

    this.actionService.createCompound(compoundWithActions)
      .pipe(take(1))
      .subscribe(
      data => {
        if (data) {
          this.successMessage = 'Compound has been successfully created';
          this.loading = false;
          this.createCompoundForm.reset();
          this.addedActions = [];
        } else {
          this.errorMessage = 'Server error';
          this.loading = false;
        }
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
}
