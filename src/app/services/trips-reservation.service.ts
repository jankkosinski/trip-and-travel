import { Injectable } from '@angular/core';
import {Reservation} from "../models/reservation_structure"
import { TripStructure } from '../models/trips_structure';

@Injectable({
  providedIn: 'root'
})
export class TripsReservationService {

  reservationsData: Reservation[] = [];

  constructor() { }

  getReservations(): Reservation[] {
    return this.reservationsData;
  }

  addTripReservation(trip: TripStructure): Reservation[] {
    let newReservation: Reservation = {
      trip: trip,
      reservations_count: 1
    }
    this.reservationsData.push(newReservation);
    return this.reservationsData;
  }

  deleteTripReservation(trip: TripStructure): Reservation[] {
    this.reservationsData = this.reservationsData.filter(obj => obj.trip !== trip);
    return this.reservationsData;
  }

  addReservation(trip: TripStructure): Reservation[] {
    let index = this.reservationsData.findIndex(obj => obj.trip === trip);
    let newValue = this.reservationsData[index].reservations_count + 1;
    this.reservationsData[index].reservations_count = newValue;
    return this.reservationsData;
  }

  removeReservation(trip: TripStructure): Reservation[] {
    let index = this.reservationsData.findIndex(obj => obj.trip === trip);
    let newValue = this.reservationsData[index].reservations_count - 1;
    this.reservationsData[index].reservations_count = newValue;
    return this.reservationsData;
  }

}

