import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCalendarEventComponent } from './add-calendar-event.component';

describe('AddCalendarEventComponent', () => {
  let component: AddCalendarEventComponent;
  let fixture: ComponentFixture<AddCalendarEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCalendarEventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCalendarEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
