import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsInTestScenarioComponent } from './actions-in-test-scenario.component';

describe('ActionsInTestScenarioComponent', () => {
  let component: ActionsInTestScenarioComponent;
  let fixture: ComponentFixture<ActionsInTestScenarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionsInTestScenarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionsInTestScenarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
