import { TestBed } from '@angular/core/testing';

import { SendReportService } from './send-report.service';

describe('SendReportService', () => {
  let service: SendReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SendReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
