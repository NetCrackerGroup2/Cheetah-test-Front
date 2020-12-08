import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryTestCaseComponent } from './history-test-case.component';

describe('HistoryTestCaseComponent', () => {
  let component: HistoryTestCaseComponent;
  let fixture: ComponentFixture<HistoryTestCaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryTestCaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryTestCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
