import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActionService} from '../../services/action/action.service';
import {Action} from '../../models/action/action';
import {Subject, Subscription} from 'rxjs';
import {TestCaseService} from '../../services/test-case/test-case.service';
import {TestCase} from '../../models/test-case/test-case';

@Component({
  selector: 'app-create-test-case',
  templateUrl: './create-test-case.component.html',
  styleUrls: ['./create-test-case.component.css']
})
export class CreateTestCaseComponent implements OnInit {

  successMessage: string;
  errorMessage: string;
  createCompoundForm: FormGroup;
  testCases: TestCase[];
  addedTestCases: Action[] = [];
  searchTerm$ = new Subject<string>();
  searchTestCaseSubscription: Subscription;
  createSubscription: Subscription;
  @ViewChild('term') term;
  loading = false;

  constructor(private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              ) {

  }

  ngOnInit(): void {

  }

}
