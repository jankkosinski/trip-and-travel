import { Component, OnInit } from '@angular/core';
import { TripStructure } from '../../models/trips_structure';
import { TripsDataService } from '../../services/trips-data.service';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})

export class TripsComponent implements OnInit {

  reservationsCount = 0;
  tripsDataList: TripStructure[] = <TripStructure[]>[];
  borderPrices: BorderTrips = <BorderTrips>{};

  constructor(private tripDataService: TripsDataService) { }

  ngOnInit(): void {
    this.getTripsData();
    this.findBorderTrips();
  }

  getTripsData(): void {
    this.tripsDataList = this.tripDataService.getProducts();
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

  addTripReservation(trip: TripStructure) {
    let newValue = trip.availableSeats - 1;
    this.tripsDataList = this.tripDataService.updateProduct(trip, "availableSeats", newValue);
    this.reservationsCount++;
  }

  removeTripReservation(trip: TripStructure) {
    let newValue = trip.availableSeats + 1;
    this.tripsDataList = this.tripDataService.updateProduct(trip, "availableSeats", newValue);
    this.reservationsCount--;
  }

  removeTrip(trip: TripStructure) {
    this.tripsDataList = this.tripDataService.deleteProduct(trip);
    this.reservationsCount = this.reservationsCount - (trip.maxSeats - trip.availableSeats);
    this.findBorderTrips();
  }

  rateTrip(trip: TripStructure, rate: number) {
    let tripValueRate = trip.rate;
    let tripValueRatedCount = trip.rated_count;
    let newValueRate;
    if (tripValueRatedCount == 0) {
      newValueRate = rate;
    } else {
      newValueRate = ((tripValueRate*tripValueRatedCount) + rate) / (tripValueRatedCount + 1);
    }
    tripValueRatedCount++;
    this.tripsDataList = this.tripDataService.updateProduct(trip, "rate", newValueRate);
    this.tripsDataList = this.tripDataService.updateProduct(trip, "rated_count", tripValueRatedCount);
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
