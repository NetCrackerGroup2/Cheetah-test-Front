import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Action} from "../../models/action/action";
import {Subject, Subscription} from "rxjs";
import {Compound} from "../../models/compound/compound";
import {ActivatedRoute} from "@angular/router";
import {ActionService} from "../../services/action/action.service";
import {CompoundService} from "../../services/compound/compound.service";
import {TestScenarioService} from "../../services/test-scenario/test-scenario.service";
import {first} from "rxjs/operators";
import {ActionsAndCompounds} from "../../models/actions-and-compounds/actions-and-compounds";
import {ActionsAndCompoundsDto} from "../../models/actions-and-compounds-dto/actions-and-compounds-dto";
import {TestScenarioDto} from "../../models/test-scenario-dto/test-scenario-dto";
import {TestScenarioCreateDto} from "../../models/test-scenario-create-dto/test-scenario-create-dto";

@Component({
  selector: 'app-create-test-scenario',
  templateUrl: './create-test-scenario.component.html',
  styleUrls: ['./create-test-scenario.component.css']
})
export class CreateTestScenarioComponent implements OnInit, OnDestroy {
  successMessage: string;
  errorMessage: string;
  createTestScenarioForm: FormGroup;
  theTestCaseId: number;

  private testScenarioService: TestScenarioService;

  actions: Action[];
  compounds: Compound[];

  addedActionsAndCompounds: ActionsAndCompounds[] = [];

  searchTermAct$ = new Subject<string>();
  searchActionSubscription: Subscription;
  searchTermComp$ = new Subject<string>();
  searchCompoundSubscription: Subscription;

  createSubscription: Subscription;

  @ViewChild('termA') termA;
  @ViewChild('termC') termC;
  loading = false;

  constructor(private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private actionService: ActionService,
              private compoundService: CompoundService) {
    this.searchActionSubscription = this.actionService.search(this.searchTermAct$)
      .subscribe(results => {
        this.actions = results;
      });

    this.searchCompoundSubscription = this.compoundService.search(this.searchTermComp$)
      .subscribe(results => {
        this.compounds = results;
      });
  }

  ngOnInit(): void {
    this.createTestScenarioForm = this.formBuilder.group({
      name: new FormControl('',
        [Validators.required, Validators.maxLength(100)]),
      description: new FormControl('',
        [Validators.required, Validators.maxLength(300)])
    });
    this.theTestCaseId = +this.route.snapshot.paramMap.get('id');
  }

  get description(): any {
    return this.createTestScenarioForm.get('description');
  }

  get name(): any {
    return this.createTestScenarioForm.get('name');
  }

  onSubmit(): void {
    this.errorMessage = '';
    this.successMessage = '';
    this.loading = true;
    const actAndCompDTO: ActionsAndCompoundsDto[] = [];
    for (const actAndComp of this.addedActionsAndCompounds) {
      actAndCompDTO.push(new ActionsAndCompoundsDto(actAndComp.getId(), actAndComp.getKind()));
    }

    const testScenarioDto: TestScenarioDto =
      new TestScenarioDto(this.name.value, this.description.value, this.theTestCaseId);

    // testScenarioCreateDto is testScenarioDto + list of actions and compounds
    const testScenarioCreateDto: TestScenarioCreateDto =
      new TestScenarioCreateDto(testScenarioDto, actAndCompDTO);

    this.createSubscription = this.testScenarioService.createTestScenario(testScenarioCreateDto)
      .pipe(first())
      .subscribe(
        data => {
          if (data) {
            this.successMessage = 'Test Scenario has been successfully created';
            this.loading = false;
            this.createTestScenarioForm.reset();
            this.addedActionsAndCompounds = [];
          } else {
            this.errorMessage = 'Server error';
            this.loading = false;
          }
        });
  }

  addToListAct(action: Action): void {
      this.addedActionsAndCompounds.push(new ActionsAndCompounds(action.id, action.title, 'ACTION'));
  }

  addToListComp(compound: Compound): void {
      this.addedActionsAndCompounds.push(new ActionsAndCompounds(compound.id, compound.title, 'COMPOUND'));
  }

  removeActAndComp(actAndComp: ActionsAndCompounds): void {
    const index = this.addedActionsAndCompounds.indexOf(actAndComp, 0);
    if (index > -1) {
      this.addedActionsAndCompounds.splice(index, 1);
    }
  }

  cleanList(): void {
    this.searchTermAct$.next();
    this.searchTermComp$.next();
    this.termA.nativeElement.value = '';
    this.termC.nativeElement.value = '';
    this.actions = [];
    this.compounds = [];
  }

  ngOnDestroy(): void {
    if (this.searchActionSubscription) {
      this.searchActionSubscription.unsubscribe();
    }
    if (this.searchCompoundSubscription) {
      this.searchCompoundSubscription.unsubscribe();
    }
    if (this.createSubscription) {
      this.createSubscription.unsubscribe();
    }
  }
}
