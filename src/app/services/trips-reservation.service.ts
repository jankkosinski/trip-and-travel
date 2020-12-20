import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {Reservation} from "../models/reservation_structure"

@Injectable({
  providedIn: 'root'
})
export class TripsReservationService {

  private reservationsDataCollection: AngularFirestoreCollection<Reservation>;
  reservationDataList: Observable<Reservation[]>;

  constructor(private db: AngularFirestore) { 
    this.reservationsDataCollection = this.db.collection<Reservation>('/reservations');
    this.reservationDataList = this.reservationsDataCollection.valueChanges({ idField: 'id'});
  }

  addTripReservation(tripID: string) {
    let reservation: Reservation = {
      id: "newReservation",
      trip_id: tripID,
      reservations_count: 1
    }
    delete reservation.id;
    return this.reservationsDataCollection.add(reservation);
  }

  deleteTripReservation(reservation: Reservation) {
    const id: string = reservation.id;
    this.reservationsDataCollection.doc(id).delete();
  }

  addReservation(reservation: Reservation) {
    const id: string = reservation.id;
    reservation.reservations_count = reservation.reservations_count + 1;
    delete reservation.id;
    this.reservationsDataCollection.doc(id).update(reservation);
  }

  removeReservation(reservation: Reservation) {
    const id: string = reservation.id;
    reservation.reservations_count = reservation.reservations_count - 1;
    delete reservation.id;
    this.reservationsDataCollection.doc(id).update(reservation);
  }

}

