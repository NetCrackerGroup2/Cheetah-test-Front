import { TestBed } from '@angular/core/testing';

import { ActScenAndDataSetService } from './act-scen-and-data-set.service';

describe('ActScenAndDataSetService', () => {
  let service: ActScenAndDataSetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActScenAndDataSetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
