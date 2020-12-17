import { Component, OnInit } from '@angular/core';
import { TripStructure } from '../../models/trips_structure';
import { TripsDataService } from '../../services/trips-data.service';
import { TripsReservationService } from "../../services/trips-reservation.service"
import { FilterStructure } from "../../models/filter_structure"

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})

export class TripsComponent implements OnInit {

  reservationsCount: number = 0;
  tripsDataList: TripStructure[] = <TripStructure[]>[];
  borderPrices: BorderTrips = <BorderTrips>{};
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
    this.tripDataService.getProducts().subscribe(
      tripDataListStream => {
        this.tripsDataList = tripDataListStream;
        this.findBorderTrips();
      }
    )
    this.tripsReservationServise.getReservations().subscribe(
      reservationStream => {
        let newReservationCount = 0;
        for (let i = 0; i < reservationStream.length; i++) {
          newReservationCount = newReservationCount + reservationStream[i].reservations_count;
        }
        this.reservationsCount = newReservationCount;
      }
    )
  }

  ngOnInit(): void {
    this.findBorderTrips();
  }

  findBorderTrips(): void {
    this.borderPrices = {
      low: {
        value: this.tripsDataList[0].price,
        trips: [this.tripsDataList[0]]
      },
      high: {
        value: this.tripsDataList[0].price,
        trips: [this.tripsDataList[0]]
      }
    }
    for (let i = 1; i <  this.tripsDataList.length; i++) {

        if (this.tripsDataList[i].price > this.borderPrices.high.value) {
          this.borderPrices.high.value = this.tripsDataList[i].price;
          this.borderPrices.high.trips = [this.tripsDataList[i]];
        } else if (this.tripsDataList[i].price == this.borderPrices.high.value) {
          this.borderPrices.high.trips.push(this.tripsDataList[i]);
        }

        if (this.tripsDataList[i].price < this.borderPrices.low.value) {
          this.borderPrices.low.value = this.tripsDataList[i].price;
          this.borderPrices.low.trips = [this.tripsDataList[i]];
        } else if (this.tripsDataList[i].price == this.borderPrices.low.value) {
          this.borderPrices.low.trips.push(this.tripsDataList[i]);
        }
      
    }
  }

  addTripReservation(trip: TripStructure): void {
    let newValue = trip.availableSeats - 1;
    if (trip.availableSeats == trip.maxSeats) {
      this.tripsReservationServise.addTripReservation(trip);
    } else {
      this.tripsReservationServise.addReservation(trip);
    }
    this.tripDataService.updateProduct(trip, "availableSeats", newValue);
  }

  removeTripReservation(trip: TripStructure): void {
    let newValue = trip.availableSeats + 1;
    if (newValue == trip.maxSeats) {
      this.tripsReservationServise.deleteTripReservation(trip);
    } else {
      this.tripsReservationServise.removeReservation(trip);
    }
    this.tripDataService.updateProduct(trip, "availableSeats", newValue);
  }

  removeTrip(trip: TripStructure): void {
    this.tripsReservationServise.deleteTripReservation(trip);
    this.tripDataService.deleteProduct(trip);
    this.findBorderTrips();
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
    this.tripDataService.updateProduct(trip, "rate", newValueRate);
    this.tripDataService.updateProduct(trip, "rated_count", tripValueRatedCount);
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
