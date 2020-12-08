import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTestScenarioComponent } from './create-test-scenario.component';

describe('CreateTestScenarioComponent', () => {
  let component: CreateTestScenarioComponent;
  let fixture: ComponentFixture<CreateTestScenarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTestScenarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTestScenarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
