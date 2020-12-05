import { TestBed } from '@angular/core/testing';

import { CircularDiagramServiceService } from './circular-diagram-service.service';

describe('SircularDiagramServiceService', () => {
  let service: CircularDiagramServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CircularDiagramServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
