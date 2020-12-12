import { TestBed } from '@angular/core/testing';

import { AddCalendarEventService } from './add-calendar-event.service';

describe('AddCalendarEventService', () => {
  let service: AddCalendarEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddCalendarEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
