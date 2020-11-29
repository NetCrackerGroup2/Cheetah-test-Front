import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Subject, Subscription} from 'rxjs';
import {UserService} from '../../services/user/user.service';
import {first} from 'rxjs/operators';
import {TestCaseService} from '../../services/test-case/test-case.service';
import {TestCase} from '../../models/test-case/test-case';

@Component({
  selector: 'app-create-test-case',
  templateUrl: './create-test-case.component.html',
  styleUrls: ['./create-test-case.component.css']
})
export class CreateTestCaseComponent implements OnInit, OnDestroy {

  projectId: number;
  successMessage: string;
  errorMessage: string;
  createTestCaseForm: FormGroup;
  createTestCaseSubscription: Subscription;
  loading = false;
  isEdit = false;
  id: number;

  constructor(private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private userService: UserService,
              private testCaseService: TestCaseService) {

    this.projectId = +this.route.snapshot.paramMap.get('projectId');
  }

  ngOnInit(): void {
    this.isEdit = this.route.snapshot.paramMap.has('title');

    let titleToEdit = '';
    if (this.isEdit) {
      titleToEdit = this.route.snapshot.paramMap.get('title');
      this.id = +this.route.snapshot.paramMap.get('id');
    }

    this.createTestCaseForm = this.formBuilder.group({
      title: new FormControl(titleToEdit,
        [Validators.required,
          Validators.maxLength(100),
          Validators.minLength(3)])
    });
  }

  get title(): any {
    return this.createTestCaseForm.get('title');
  }

  onSubmit(): void {
    this.errorMessage = '';
    this.successMessage = '';
    this.loading = true;
    const testCase: TestCase =
      new TestCase(this.title.value, this.projectId, 'ACTIVE', 'CREATED');

    this.createTestCaseSubscription = this.testCaseService.save(testCase, this.isEdit, this.id)
      .pipe(first())
      .subscribe(
        data => {
          if (data === 'Test Case Already Exists') {
            this.errorMessage = 'Test Case Already Exists';
          } else if (data === 'Project Not Found') {
            this.errorMessage = 'Project Not Found';
          } else if (data) {
            this.successMessage = 'Test Case has been successfully saved';
            this.createTestCaseForm.reset();
          } else {
            this.errorMessage = 'Server error';
          }

          this.loading = false;
        });
  }

  ngOnDestroy(): void {
    if (this.createTestCaseSubscription) {
      this.createTestCaseSubscription.unsubscribe();
    }
  }

}
