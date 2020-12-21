import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCalendarEventComponent } from './edit-calendar-event.component';

describe('EditCalendarEventComponent', () => {
  let component: EditCalendarEventComponent;
  let fixture: ComponentFixture<EditCalendarEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCalendarEventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCalendarEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
