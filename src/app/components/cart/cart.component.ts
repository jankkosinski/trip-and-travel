import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { Reservation } from 'src/app/models/reservation_structure';
import { TripStructure } from '../../models/trips_structure';
import { TripsReservationService } from "../../services/trips-reservation.service"

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  @Output() closeCart = new EventEmitter();

  reservationsData: Reservation[] = <Reservation[]>[];
  cartValue: number = 0;

  constructor(private tripsReservationServise: TripsReservationService) { 
    this.tripsReservationServise.getReservations().subscribe(
      reservationStream => {
        this.reservationsData = reservationStream;
        let newCartValue = 0;
        for (let i = 0; i < reservationStream.length; i++) {
          newCartValue = newCartValue + (reservationStream[i].trip.price * reservationStream[i].reservations_count);
        }
        this.cartValue = newCartValue;
      }
    )
  }

  ngOnInit(): void {
  }

  removeReservation(trip: TripStructure): void {
    this.tripsReservationServise.deleteTripReservation(trip);
  }

  close(): void {
    this.closeCart.emit();
  }

}
