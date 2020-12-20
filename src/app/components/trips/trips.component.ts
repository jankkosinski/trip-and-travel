import { Component, OnInit } from '@angular/core';
import { TripStructure } from '../../models/trips_structure';
import { TripsDataService } from '../../services/trips-data.service';
import { TripsReservationService } from "../../services/trips-reservation.service"
import { FilterStructure } from "../../models/filter_structure";
import { Basket, Reservation } from 'src/app/models/reservation_structure';
import { UserRolesService } from "../../services/user-roles.service";
import { AuthService } from "../../services/auth.service";
import { UserRole } from "../../models/user_structures";
import { BasketService } from "../../services/basket.service";

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})

export class TripsComponent implements OnInit {

  actualUserRole: UserRole = <UserRole>{};
  actualUserID: string = "";
  reservationsCount: number = 0;

  tripsDataList$: TripStructure[] = [];
  reservationList$: Reservation[] = [];
  basketsList$: Basket[] = [];
  
  borderPrices: BorderTrips = {
    low: {
      value: 0,
      trips: []
    },
    high: {
      value: 0,
      trips: []
    }
  };
  filterToggle: boolean = false;
  actualFilters: FilterStructure = {
    useFilerPrice: false,
    minFilterPrice: null,
    maxFilterPrice: null,
    useFilterDate: false,
    startFilterDate: "",
    endFilterDate: "",
    useFilterRate: false,
    starFilter_1: null,
    starFilter_2: null,
    starFilter_3: null,
    starFilter_4: null,
    starFilter_5: null
  };

  constructor(
    private tripDataService: TripsDataService, 
    private tripsReservationServise: TripsReservationService,
    private userRolesService: UserRolesService,
    private authService: AuthService,
    private basketService: BasketService
    ) {
     tripDataService.tripsDataList.subscribe(
      tripStream => {
        this.tripsDataList$ = tripStream;
        this.findBorderTrips();
      }
    );
    this.tripsReservationServise.reservationDataList.subscribe(
      reservationStream => {
        this.reservationList$ = reservationStream
        let newReservationCount = 0;
        for (let i = 0; i < reservationStream.length; i++) {
          newReservationCount = newReservationCount + reservationStream[i].reservations_count;
        }
        this.reservationsCount = newReservationCount;
      }
    );
    this.basketService.basketDataList.subscribe(
      basketStream => this.basketsList$ = basketStream
    )
    this.authService.user.then(
      user => this.actualUserID = user.uid
    );
  }
  
  ngOnInit(): void {
    this.userRolesService.userRole(this.actualUserID).subscribe(
      userRole => this.actualUserRole = userRole
    )
  }

  findBorderTrips(): void {
    this.borderPrices = {
      low: {
        value: this.tripsDataList$[0].price,
        trips: [this.tripsDataList$[0]]
      },
      high: {
        value: this.tripsDataList$[0].price,
        trips: [this.tripsDataList$[0]]
      }
    }
    for (let i = 1; i <  this.tripsDataList$.length; i++) {

        if (this.tripsDataList$[i].price > this.borderPrices.high.value) {
          this.borderPrices.high.value = this.tripsDataList$[i].price;
          this.borderPrices.high.trips = [this.tripsDataList$[i]];
        } else if (this.tripsDataList$[i].price == this.borderPrices.high.value) {
          this.borderPrices.high.trips.push(this.tripsDataList$[i]);
        }

        if (this.tripsDataList$[i].price < this.borderPrices.low.value) {
          this.borderPrices.low.value = this.tripsDataList$[i].price;
          this.borderPrices.low.trips = [this.tripsDataList$[i]];
        } else if (this.tripsDataList$[i].price == this.borderPrices.low.value) {
          this.borderPrices.low.trips.push(this.tripsDataList$[i]);
        }
      
    }
  }

  addTripReservation(trip: TripStructure): void {
    // TODO: change logic for basket countering and buttons active for basket
    let newValue = trip.availableSeats - 1;
    let userBasket: Basket = this.basketsList$.find(obj => obj.user_id === this.actualUserID);
    if (trip.availableSeats == trip.maxSeats) {
      this.tripsReservationServise.addTripReservation(trip.id).then(
        reservation => {
          this.basketService.addBasketReservation(userBasket, reservation.id);
        }
      )
    } else {
      let reservation = this.reservationList$.find(obj => obj.trip_id === trip.id)
      this.tripsReservationServise.addReservation(reservation);
    }
    trip.availableSeats = newValue;
    this.tripDataService.updateProduct(trip);
  }

  removeTripReservation(trip: TripStructure): void {
    // TODO: change logic for basket countering and buttons active for basket
    let userBasket: Basket = this.basketsList$.find(obj => obj.user_id === this.actualUserID);
    let newValue = trip.availableSeats + 1;
    if (newValue == trip.maxSeats) {
      let reservation = this.reservationList$.find(obj => obj.trip_id === trip.id)
      this.basketService.removeBasketReservation(userBasket, reservation.id);
      this.tripsReservationServise.deleteTripReservation(reservation);
    } else {
      let reservation = this.reservationList$.find(obj => obj.trip_id === trip.id)
      this.tripsReservationServise.removeReservation(reservation);
    }
    trip.availableSeats = newValue;
    this.tripDataService.updateProduct(trip);
  }

  removeTrip(trip: TripStructure): void {
    let reservation = this.reservationList$.find(obj => obj.trip_id === trip.id)
    if (reservation != null) {
      this.tripsReservationServise.deleteTripReservation(reservation);
    }
    this.tripDataService.deleteProduct(trip);
  }

  rateTrip(trip: TripStructure, rate: number): void {
    let tripValueRate: number = trip.rate;
    let tripValueRatedCount: number = trip.rated_count;
    let newValueRate;
    if (tripValueRatedCount == 0) {
      newValueRate = rate;
    } else {
      newValueRate = ((tripValueRate*tripValueRatedCount) + rate) / (tripValueRatedCount + 1);
    }
    tripValueRatedCount++;
    trip.rate = newValueRate;
    trip.rated_count = tripValueRatedCount;
    this.tripDataService.updateProduct(trip);
  }

  updateFilters(newFilters: FilterStructure): void {
    this.actualFilters = newFilters;
  }

  checkFilters(trip: TripStructure): boolean {
    let pass = true;
    let passPrice = true;
    let passDate = true;
    let passRate = true;
    if (this.actualFilters.useFilerPrice) {
      if (trip.price < this.actualFilters.minFilterPrice || trip.price > this.actualFilters.maxFilterPrice) {
        passPrice = false;
      }
    }
    if (this.actualFilters.useFilterDate) {
      if (new Date(trip.start_date.toString()) < new Date(this.actualFilters.startFilterDate.toString())) {
        passDate = false;
      }
      if (new Date(trip.end_date.toString()) > new Date(this.actualFilters.endFilterDate.toString())) {
        passDate = false;
      }
    }
    if (this.actualFilters.useFilterRate) {

      passRate = false;

      if (this.actualFilters.starFilter_1) {
        if (trip.rate >= 1 && trip.rate < 2) {
          passRate = true
        }
      }
      if (this.actualFilters.starFilter_2) {
        if (trip.rate >= 2 && trip.rate < 3) {
          passRate = true
        }
      }
      if (this.actualFilters.starFilter_3) {
        if (trip.rate >= 3 && trip.rate < 4) {
          passRate = true
        }
      }
      if (this.actualFilters.starFilter_4) {
        if (trip.rate >= 4 && trip.rate < 5) {
          passRate = true
        }
      }
      if (this.actualFilters.starFilter_5) {
        if (trip.rate == 5) {
          passRate = true
        }
      }
    }
    if (passPrice == false || passDate == false || passRate == false) {
      pass = false;
    }
    return pass;
  }
}

export interface BorderTrips {
  low: {
    value: number;
    trips: TripStructure[];
  }
  high: {
    value: number;
    trips: TripStructure[];
  }
}
