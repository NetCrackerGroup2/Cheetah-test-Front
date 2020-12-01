import { TestBed } from '@angular/core/testing';

import { TestCaseListService } from './test-case-list.service';

describe('TestCaseListService', () => {
  let service: TestCaseListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestCaseListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
