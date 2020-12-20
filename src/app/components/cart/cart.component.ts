import { Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import { Reservation } from 'src/app/models/reservation_structure';
import { TripStructure } from '../../models/trips_structure';
import { TripsReservationService } from "../../services/trips-reservation.service"
import { TripsDataService } from '../../services/trips-data.service';
import { BasketService } from "../../services/basket.service";
import { Basket } from "../../models/reservation_structure"

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  @Input() userID: string;
  @Output() closeCart = new EventEmitter();

  tripsDataList$: TripStructure[] = [];
  reservationList$: Reservation[] = [];
  basketsList$: Basket[] = [];

  cartValue: number = 0;

  constructor(
    private tripsReservationServise: TripsReservationService, 
    private tripDataService: TripsDataService,
    private basketService: BasketService
    ) { 
    tripDataService.tripsDataList.subscribe(
      tripStream => {
        this.tripsDataList$ = tripStream;
      }
    );
    this.basketService.basketDataList.subscribe(
      basketStream => this.basketsList$ = basketStream
    );
    this.tripsReservationServise.reservationDataList.subscribe(
      reservationStream => {
        this.reservationList$ = reservationStream
        let newCartValue = 0;
        for (let i = 0; i < reservationStream.length; i++) {
          let trip = this.tripsDataList$.find(obj => obj.id === reservationStream[i].trip_id);
          newCartValue = newCartValue + (trip.price * reservationStream[i].reservations_count)
        }
        this.cartValue = newCartValue;
      }
    );
  }

  ngOnInit(): void {
  }

  getTrip(trip_id: string): TripStructure {
    return this.tripsDataList$.find(obj => obj.id === trip_id)
  }

  removeReservation(trip_id: string): void {
    let reservation = this.reservationList$.find(obj => obj.trip_id === trip_id);
    this.tripsReservationServise.deleteTripReservation(reservation);
    let trip = this.tripsDataList$.find(obj => obj.id === trip_id);
    trip.availableSeats = trip.maxSeats;
    this.tripDataService.updateProduct(trip);
  }

  close(): void {
    this.closeCart.emit();
  }

}
