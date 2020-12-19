import { Component, OnInit } from '@angular/core';
import { TripStructure } from '../../models/trips_structure';
import { TripsDataService } from '../../services/trips-data.service';
import { TripsReservationService } from "../../services/trips-reservation.service"
import { FilterStructure } from "../../models/filter_structure"
import { Reservation } from 'src/app/models/reservation_structure';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})

export class TripsComponent implements OnInit {

  reservationsCount: number = 0;
  tripsDataList$: TripStructure[] = [];
  reservationList: Reservation[] = [];
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

  constructor(private tripDataService: TripsDataService, private tripsReservationServise: TripsReservationService) {
     tripDataService.tripsDataList.subscribe(
      tripStream => {
        this.tripsDataList$ = tripStream;
        this.findBorderTrips();
      }
    );
    this.tripsReservationServise.reservationDataList.subscribe(
      reservationStream => {
        this.reservationList = reservationStream
        let newReservationCount = 0;
        for (let i = 0; i < reservationStream.length; i++) {
          newReservationCount = newReservationCount + reservationStream[i].reservations_count;
        }
        this.reservationsCount = newReservationCount;
      }
    )
  }

  ngOnInit(): void {
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
    let newValue = trip.availableSeats - 1;
    if (trip.availableSeats == trip.maxSeats) {
      let newReservation: Reservation = {
        id: "newReservation",
        trip_id: trip.id,
        reservations_count: 1
      }
      this.tripsReservationServise.addTripReservation(newReservation);
    } else {
      let reservation = this.reservationList.find(obj => obj.trip_id === trip.id)
      this.tripsReservationServise.addReservation(reservation);
    }
    trip.availableSeats = newValue;
    this.tripDataService.updateProduct(trip);
  }

  removeTripReservation(trip: TripStructure): void {
    let newValue = trip.availableSeats + 1;
    if (newValue == trip.maxSeats) {
      let reservation = this.reservationList.find(obj => obj.trip_id === trip.id)
      this.tripsReservationServise.deleteTripReservation(reservation);
    } else {
      let reservation = this.reservationList.find(obj => obj.trip_id === trip.id)
      this.tripsReservationServise.removeReservation(reservation);
    }
    trip.availableSeats = newValue;
    this.tripDataService.updateProduct(trip);
  }

  removeTrip(trip: TripStructure): void {
    let reservation = this.reservationList.find(obj => obj.trip_id === trip.id)
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
