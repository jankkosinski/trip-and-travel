import { Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import { Reservation } from 'src/app/models/reservation_structure';
import { TripStructure } from '../../models/trips_structure';
import { TripsReservationService } from "../../services/trips-reservation.service"
import { TripsDataService } from '../../services/trips-data.service';
import { BasketService } from "../../services/basket.service";
import { Basket } from "../../models/reservation_structure"
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  @Input() userID: string;
  @Output() closeCart = new EventEmitter();

  tripsDataList$: TripStructure[] = [];
  basketsList$: Basket[] = [];
  userReservationList$: Reservation[] = [];

  actualUserID: string = "";

  cartValue: number = 0;

  constructor(
    private tripsReservationServise: TripsReservationService, 
    private tripDataService: TripsDataService,
    private basketService: BasketService,
    private authService: AuthService
    ) { 
    tripDataService.tripsDataList.subscribe(
      tripStream => {
        this.tripsDataList$ = tripStream;
      }
    );
    this.basketService.basketDataList.subscribe(
      basketStream => this.basketsList$ = basketStream
    );
    this.authService.user.then(
      user => this.actualUserID = user.uid
    );
    this.tripsReservationServise.reservationDataList.subscribe(
      reservationStream => {
        let userBasket: Basket = this.basketsList$.find(obj => obj.user_id === this.actualUserID);
        this.userReservationList$ = reservationStream.filter(obj => userBasket.reservation_list.indexOf(obj.id) != -1);
        let newCartValue = 0;
        for (let i = 0; i < this.userReservationList$.length; i++) {
          let trip = this.tripsDataList$.find(obj => obj.id === this.userReservationList$[i].trip_id);
          newCartValue = newCartValue + (trip.price * this.userReservationList$[i].reservations_count);
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

  removeReservation(reservation: Reservation): void {
    let userBasket: Basket = this.basketsList$.find(obj => obj.user_id === this.actualUserID);
    let trip = this.tripsDataList$.find(obj => obj.id === reservation.trip_id);
    trip.availableSeats = trip.availableSeats + reservation.reservations_count;
    this.tripDataService.updateProduct(trip);
    this.basketService.removeBasketReservation(userBasket, reservation.id);
    this.tripsReservationServise.deleteTripReservation(reservation);
  }

  close(): void {
    this.closeCart.emit();
  }

}
