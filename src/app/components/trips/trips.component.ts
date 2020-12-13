import { Component, OnInit } from '@angular/core';
import { TripStructure } from '../../models/trips_structure';
import { TripsDataService } from '../../services/trips-data.service';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})

export class TripsComponent implements OnInit {

  myActualReservations = 0;
  tripsDataList: TripStructure[] = [];

  borderPrices = {
    low: {value: 0, trips: []}, 
    high: {value: 0, trips: []}
  };

  constructor(private tripDataService: TripsDataService) { }

  ngOnInit(): void {
    this.getTripsData();
    this.findBorderTrips();
  }

  getTripsData(): void {
    this.tripsDataList = this.tripDataService.getProducts();
  }

  findBorderTrips() {
    for (let i = 0; i <  this.tripsDataList.length; i++) {
      if (i == 0) {
        this.borderPrices.low.value = this.tripsDataList[i].price;
        this.borderPrices.high.value = this.tripsDataList[i].price;
        this.borderPrices.low.trips = [this.tripsDataList[i]];
        this.borderPrices.high.trips = [this.tripsDataList[i]];
      } else {
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
  }

  addTripReservation(trip: TripStructure) {
    let index = this.tripsDataList.indexOf(trip);
    this.tripsDataList[index].availableSeats = this.tripsDataList[index].availableSeats - 1;
    this.myActualReservations++;
  }

  removeTripReservation(trip: TripStructure) {
    let index = this.tripsDataList.indexOf(trip);
    this.tripsDataList[index].availableSeats = this.tripsDataList[index].availableSeats + 1;
    this.myActualReservations--;
  }

  removeTrip(tripToRemove: TripStructure) {
    this.tripsDataList = this.tripDataService.deleteProduct(tripToRemove);
    this.myActualReservations = this.myActualReservations - (tripToRemove.maxSeats - tripToRemove.availableSeats);
    this.findBorderTrips();
  }

  rateTrip(trip: TripStructure, rate: number) {
    let index = this.tripsDataList.indexOf(trip);
    let tripValueRate = this.tripsDataList[index].rate;
    let tripValueRatedCount = this.tripsDataList[index].rated_count;
    let newValueRate;
    if (tripValueRatedCount == 0) {
      newValueRate = rate;
    } else {
      newValueRate = ((tripValueRate*tripValueRatedCount) + rate) / (tripValueRatedCount + 1);
    }
    this.tripsDataList[index].rate = newValueRate;
    this.tripsDataList[index].rated_count = tripValueRatedCount + 1;
  }
}