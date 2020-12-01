import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTestCaseComponent } from './create-test-case.component';

describe('CreateTestCaseComponent', () => {
  let component: CreateTestCaseComponent;
  let fixture: ComponentFixture<CreateTestCaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTestCaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTestCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
