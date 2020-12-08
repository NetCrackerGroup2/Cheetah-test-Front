import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TestCaseInfoComponent} from './test-case-info.component';

describe('TestCaseInfoComponent', () => {
  let component: TestCaseInfoComponent;
  let fixture: ComponentFixture<TestCaseInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestCaseInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestCaseInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
