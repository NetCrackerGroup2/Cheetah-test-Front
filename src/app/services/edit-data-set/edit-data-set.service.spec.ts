import { TestBed } from '@angular/core/testing';

import { EditDataSetService } from './edit-data-set.service';

describe('EditDataSetService', () => {
  let service: EditDataSetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditDataSetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
