import { Component, OnInit } from '@angular/core';
import { TripStructure } from '../../models/trips_structure';
import { TripsDataService } from '../../services/trips-data.service';
import { TripsReservationService } from "../../services/trips-reservation.service"

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})

export class TripsComponent implements OnInit {

  reservationsCount: number = 0;
  tripsDataList: TripStructure[] = <TripStructure[]>[];
  borderPrices: BorderTrips = <BorderTrips>{};

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
