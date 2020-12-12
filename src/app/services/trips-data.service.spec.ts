import { TestBed } from '@angular/core/testing';

import { TripsDataService } from './trips-data.service';

describe('TripsDataService', () => {
  let service: TripsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TripsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
