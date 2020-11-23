import { TestBed } from '@angular/core/testing';

import { ActionsAndCompoundsService } from './actions-and-compounds.service';

describe('ActionsAndCompoundService', () => {
  let service: ActionsAndCompoundsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActionsAndCompoundsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
