import { Injectable } from '@angular/core';
import { TripStructure } from '../models/trips_structure';
import { EXAMPLE_TRIPS } from '../models/trips-data';

@Injectable({
  providedIn: 'root'
})
export class TripsDataService {

  private example_trips: TripStructure[] = [];

  constructor() {
    this.example_trips = EXAMPLE_TRIPS;
   }
}
