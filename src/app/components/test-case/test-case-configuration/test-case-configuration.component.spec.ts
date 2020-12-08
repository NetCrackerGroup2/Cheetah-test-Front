import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestCaseConfigurationComponent } from './test-case-configuration.component';

describe('CreateTestCaseComponent', () => {
  let component: TestCaseConfigurationComponent;
  let fixture: ComponentFixture<TestCaseConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestCaseConfigurationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestCaseConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
