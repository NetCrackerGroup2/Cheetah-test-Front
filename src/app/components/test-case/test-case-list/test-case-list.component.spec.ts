import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestCaseListComponent } from './test-case-list.component';

describe('TestcaseComponent', () => {
  let component: TestCaseListComponent;
  let fixture: ComponentFixture<TestCaseListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestCaseListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestCaseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
