import {TestBed} from '@angular/core/testing';

import {TestCaseInfoService} from './test-case-info.service';

describe('TestCaseInfoService', () => {
  let service: TestCaseInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestCaseInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
