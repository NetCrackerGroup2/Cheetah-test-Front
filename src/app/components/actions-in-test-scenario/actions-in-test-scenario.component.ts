import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subject, Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {ActionService} from "../../services/action/action.service";
import {take} from "rxjs/operators";
import {TestScenarioService} from "../../services/test-scenario/test-scenario.service";
import {ActScenAndDataSetService} from "../../services/actScenAndDataSet/act-scen-and-data-set.service";
import {ActScenario} from "../../models/act-scenario/act-scenario";
import {Parameter} from "../../models/parameter/parameter";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {UserDto} from "../../models/user/dto/user-dto";

@Component({
  selector: 'app-actions-in-test-scenario',
  templateUrl: './actions-in-test-scenario.component.html',
  styleUrls: ['./actions-in-test-scenario.component.css']
})
export class ActionsInTestScenarioComponent implements OnInit, OnDestroy {

  successMessage: string;
  errorMessage: string;
  loading = false;


  testScenarioId: number;
  theTestCaseId: number;
  testScenarioTitle: string;
  testScenarioDescription: string;
  actScenarios: ActScenario[];
  parameters: Parameter[];
  addedParameters: Parameter[] = [];

  subscription: Subscription;
  searchParametersSubscription: Subscription;
  searchTerm$ = new Subject<string>();
  @ViewChild('term') term;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private actionsService: ActionService,
              private testScenarioService: TestScenarioService,
              private actScenAndDataSetService: ActScenAndDataSetService) {
  }

  ngOnInit(): void {
    this.testScenarioId = +this.route.snapshot.paramMap.get('idTestScenario');
    this.theTestCaseId = +this.route.snapshot.paramMap.get('idTestCase');
    this.subscription = this.route
      .queryParams
      .subscribe(params => {
        this.testScenarioTitle = params.testScenarioTitle || '';
        this.testScenarioDescription = params.testScenarioDescription || '';
      });

    this.searchParametersSubscription = this.actScenAndDataSetService.search(this.searchTerm$, this.theTestCaseId)
      .subscribe(results => {
        this.parameters = results;
      });

    this.listActScenarios();
  }

  private listActScenarios(): void {
    this.actScenAndDataSetService.getAllActScenByIdTestScen(this.testScenarioId)
      .pipe(take(1))
      .subscribe(
        data => {
          this.actScenarios = data;
        }
      );
  }

  private listParameters(): void {
    this.actScenAndDataSetService.getAllParamByIdTestCase(this.theTestCaseId)
      .pipe(take(1))
      .subscribe(
        data => {
          this.parameters = data;
        }
      );
  }

  addToList(parameter: Parameter): void {
    this.addedParameters.push(parameter);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.searchParametersSubscription.unsubscribe();
  }

  cleanList(): void {
    this.searchTerm$.next();
    this.term.nativeElement.value = '';
    this.parameters = [];
  }

  removeParameter(param: Parameter): void {
    const index = this.addedParameters.indexOf(param, 0);
    if (index > -1) {
      this.addedParameters.splice(index, 1);
    }
  }

  save(): void {
    this.loading = true;
    this.successMessage = '';
    this.errorMessage = '';

    if (this.addedParameters.length !== this.actScenarios.length){
      this.errorMessage = 'Count of chosen parameters must be: ' + this.actScenarios.length;
      this.loading = false;
    } else {
    this.actScenAndDataSetService.save(this.actScenarios, this.addedParameters)
      .pipe(take(1))
      .subscribe(
        (data) => {
          if (data) {
            this.successMessage = 'Order has been successfully saved';
          } else {
            this.errorMessage = 'Error';
          }
          this.loading = false;
        }
      );
    }
  }


  drop($event: CdkDragDrop<UserDto[]>): void {
    moveItemInArray(this.addedParameters, $event.previousIndex, $event.currentIndex);
  }

}
