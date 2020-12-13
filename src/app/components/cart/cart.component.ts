import { Component, OnInit } from '@angular/core';
import { Reservation } from 'src/app/models/reservation_structure';
import { TripsReservationService } from "../../services/trips-reservation.service"

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  reservationsData: Reservation[] = <Reservation[]>[];

  constructor(private tripsReservationServise: TripsReservationService) { }

  ngOnInit(): void {
    this.getReservations();
  }

  getReservations(): void {
    this.reservationsData = this.tripsReservationServise.getReservations();
  }

}
