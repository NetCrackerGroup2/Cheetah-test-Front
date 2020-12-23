import { TestBed } from '@angular/core/testing';

import { TestScenarioService } from './test-scenario.service';

describe('TestScenarioService', () => {
  let service: TestScenarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestScenarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
