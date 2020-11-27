import { TestBed } from '@angular/core/testing';

import { CompoundService } from './compound.service';

describe('CompoundService', () => {
  let service: CompoundService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompoundService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
