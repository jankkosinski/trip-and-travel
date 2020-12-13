import { Injectable } from '@angular/core';
import {Reservation} from "../models/reservation_structure"

@Injectable({
  providedIn: 'root'
})
export class TripsReservationService {

  reservationsData: Reservation[] = [];

  constructor() { }

  getReservations(): Reservation[] {
    return this.reservationsData;
  }

  addTripReservation(reservation: Reservation): Reservation[] {
    this.reservationsData.push(reservation);
    return this.reservationsData;
  }

  deleteTripReservation(reservation: Reservation): Reservation[] {
    this.reservationsData = this.reservationsData.filter(obj => obj !== reservation);
    return this.reservationsData;
  }

  addReservation(reservation: Reservation): Reservation[] {
    let index = this.reservationsData.indexOf(reservation);
    this.reservationsData[index].reservations_count = reservation.reservations_count + 1;
    return this.reservationsData;
  }

  removeReservation(reservation: Reservation): Reservation[] {
    let index = this.reservationsData.indexOf(reservation);
    this.reservationsData[index].reservations_count = reservation.reservations_count - 1;
    return this.reservationsData;
  }

}

