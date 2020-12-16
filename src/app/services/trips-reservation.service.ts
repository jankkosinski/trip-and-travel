import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {Reservation} from "../models/reservation_structure"
import { TripStructure } from '../models/trips_structure';

@Injectable({
  providedIn: 'root'
})
export class TripsReservationService {

  private reservationsData = new BehaviorSubject<Reservation[]>([]);

  constructor() { }

  getReservations(): Observable<Reservation[]> {
    return this.reservationsData.asObservable();
  }

  addTripReservation(trip: TripStructure) {
    let newReservation: Reservation = {
      trip: trip,
      reservations_count: 1
    }
    let actualReservationData = this.reservationsData.getValue();
    actualReservationData.push(newReservation);
    this.reservationsData.next(actualReservationData);
  }

  deleteTripReservation(trip: TripStructure) {
    let actualReservationData = this.reservationsData.getValue();
    actualReservationData = actualReservationData.filter(obj => obj.trip !== trip);
    this.reservationsData.next(actualReservationData);
  }

  addReservation(trip: TripStructure) {
    let actualReservationData = this.reservationsData.getValue();
    let index = actualReservationData.findIndex(obj => obj.trip === trip);
    let newValue = actualReservationData[index].reservations_count + 1;
    actualReservationData[index].reservations_count = newValue;
    this.reservationsData.next(actualReservationData);
  }

  removeReservation(trip: TripStructure) {
    let actualReservationData = this.reservationsData.getValue();
    let index = actualReservationData.findIndex(obj => obj.trip === trip);
    let newValue = actualReservationData[index].reservations_count - 1;
    actualReservationData[index].reservations_count = newValue;
    this.reservationsData.next(actualReservationData);
  }

}

