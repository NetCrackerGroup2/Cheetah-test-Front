import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {DataSetService} from '../../services/data-set/data-set.service';
import {DataSet} from '../../models/data-set/data-set';

@Component({
  selector: 'app-edit-data-set',
  templateUrl: './edit-data-set.component.html',
  styleUrls: ['./edit-data-set.component.css']
})
export class EditDataSetComponent implements OnInit, OnDestroy {
  dataSet: DataSet = new DataSet();
  dataSetId: number;
  dataSetTitle: string;
  theProjectId: number;
  testCaseId: number;
  createDataSetForm: FormGroup;
  createTestCaseSubscription: Subscription;
  querySubscription: Subscription;
  loading = false;
  isEdit = false;
  id: number;

  constructor(private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private dataSetService: DataSetService,
  ) {
    this.querySubscription = route.queryParams.subscribe(
      (queryParam: any) => {
        this.dataSet.title = queryParam.title;
        this.dataSet.description = queryParam.description;
      }
    );
    this.dataSetId = +this.route.snapshot.paramMap.get('id');
    this.theProjectId = +this.route.snapshot.paramMap.get('projectId');
    this.testCaseId = +this.route.snapshot.paramMap.get('testCaseId');
  }

  ngOnInit(): void {
    this.createDataSetForm = this.formBuilder.group({
      title: new FormControl(this.dataSet.title,
        [Validators.required,
          Validators.maxLength(100),
          Validators.minLength(3)]),
      description: new FormControl(this.dataSet.description,
        [Validators.required,
          Validators.maxLength(100),
          Validators.minLength(3)])
    });
  }

  get title(): any {
    return this.createDataSetForm.get('title');
  }

  get description(): any {
    return this.createDataSetForm.get('description');
  }


  onSubmit(): void {

  }

  ngOnDestroy(): void {
    if (this.createTestCaseSubscription) {
      this.createTestCaseSubscription.unsubscribe();
      this.querySubscription.unsubscribe();
    }
  }
  backToDataSet(): string{
    return `/projects/${this.theProjectId}/test-cases/${this.testCaseId}/data-set`;
  }
}
