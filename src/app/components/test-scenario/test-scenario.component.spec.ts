import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestScenarioComponent } from './test-scenario.component';

describe('TestScenarioComponent', () => {
  let component: TestScenarioComponent;
  let fixture: ComponentFixture<TestScenarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestScenarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestScenarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
