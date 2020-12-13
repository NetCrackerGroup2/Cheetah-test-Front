import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCalendarEventComponent } from './delete-calendar-event.component';

describe('DeleteCalendarEventComponent', () => {
  let component: DeleteCalendarEventComponent;
  let fixture: ComponentFixture<DeleteCalendarEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteCalendarEventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteCalendarEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
