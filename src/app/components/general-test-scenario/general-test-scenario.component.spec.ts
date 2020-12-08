import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralTestScenarioComponent } from './general-test-scenario.component';

describe('GeneralTestScenarioComponent', () => {
  let component: GeneralTestScenarioComponent;
  let fixture: ComponentFixture<GeneralTestScenarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralTestScenarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralTestScenarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
