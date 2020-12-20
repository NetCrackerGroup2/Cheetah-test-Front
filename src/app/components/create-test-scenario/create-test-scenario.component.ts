import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Action} from "../../models/action/action";
import {Subject, Subscription} from "rxjs";
import {Compound} from "../../models/compound/compound";
import {ActivatedRoute, Router} from "@angular/router";
import {ActionService} from "../../services/action/action.service";
import {CompoundService} from "../../services/compound/compound.service";
import {TestScenarioService} from "../../services/test-scenario/test-scenario.service";
import {take} from "rxjs/operators";
import {ActionsAndCompounds} from "../../models/actions-and-compounds/actions-and-compounds";
import {ActionsAndCompoundsDto} from "../../models/actions-and-compounds-dto/actions-and-compounds-dto";
import {TestScenarioDto} from "../../models/test-scenario-dto/test-scenario-dto";
import {TestScenarioCreateDto} from "../../models/test-scenario-create-dto/test-scenario-create-dto";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {UserDto} from "../../models/user/dto/user-dto";

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

  actions: Action[];
  compounds: Compound[];

  addedActionsAndCompounds: ActionsAndCompounds[] = [];

  searchTermAct$ = new Subject<string>();
  @ViewChild('termA') termA;
  searchActionSubscription: Subscription;
  searchTermComp$ = new Subject<string>();
  @ViewChild('termC') termC;
  searchCompoundSubscription: Subscription;
  loading = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              private actionService: ActionService,
              private compoundService: CompoundService,
              private testScenarioService: TestScenarioService) {
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

  goBack(): void {
    this.router.navigate(['general-test-scenario', this.theTestCaseId]);
  }

  onSubmit(): void {
    this.errorMessage = '';
    this.successMessage = '';
    this.loading = true;
    const actAndCompDTO: ActionsAndCompoundsDto[] = [];
    for (const actAndComp of this.addedActionsAndCompounds) {
      const newActAndCompDto: ActionsAndCompoundsDto = new ActionsAndCompoundsDto();
      newActAndCompDto.id = actAndComp.getId();
      newActAndCompDto.kind = actAndComp.getKind();
      actAndCompDTO.push(newActAndCompDto);
    }

    const testScenarioDto: TestScenarioDto =
      new TestScenarioDto(this.name.value, this.description.value, this.theTestCaseId);

    // testScenarioCreateDto is testScenarioDto + list of actions and compounds
    const testScenarioCreateDto: TestScenarioCreateDto =
      new TestScenarioCreateDto(testScenarioDto, actAndCompDTO);

    this.testScenarioService.createTestScenario(testScenarioCreateDto)
      .pipe(take(1))
      .subscribe(
        data => {
          if (data.id) {
            this.successMessage = 'Test Scenario has been successfully created';
            this.createTestScenarioForm.reset();
            this.addedActionsAndCompounds = [];
          } else if (data === 'Test Scenario Already Exists') {
            this.errorMessage = 'Test Scenario with such name already exists';
          } else {
            this.errorMessage = 'Server error';
          }
          this.loading = false;
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
  }

  drop($event: CdkDragDrop<UserDto[]>): void {
    moveItemInArray(this.addedActionsAndCompounds, $event.previousIndex, $event.currentIndex);
  }
}
