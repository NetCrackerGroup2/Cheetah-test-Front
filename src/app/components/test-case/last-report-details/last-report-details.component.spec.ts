import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastReportDetailsComponent } from './last-report-details.component';

describe('LastReportDetailsComponent', () => {
  let component: LastReportDetailsComponent;
  let fixture: ComponentFixture<LastReportDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LastReportDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LastReportDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
