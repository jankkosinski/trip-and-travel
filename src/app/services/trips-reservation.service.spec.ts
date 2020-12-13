import { TestBed } from '@angular/core/testing';

import { TripsReservationService } from './trips-reservation.service';

describe('TripsReservationService', () => {
  let service: TripsReservationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TripsReservationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
