import { Component, OnInit } from '@angular/core';
import { TripStructure } from '../../models/trips_structure';
import { TripsDataService } from '../../services/trips-data.service';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})

export class TripsComponent implements OnInit {

  actualReservations = 0;

  example_trips: TripStructure[] = [];

  borderPrices = {
    low: {value: 0, trips: []}, 
    high: {value: 0, trips: []}
  };

  constructor(private tripDataService: TripsDataService) { }

  ngOnInit(): void {
    for (let i = 0; i <  this.example_trips.length; i++) {
      if (i == 0) {
        this.borderPrices.low.value = this.example_trips[i].price;
        this.borderPrices.high.value = this.example_trips[i].price;
        this.borderPrices.low.trips = [this.example_trips[i]];
        this.borderPrices.high.trips = [this.example_trips[i]];
      } else {
        if (this.example_trips[i].price > this.borderPrices.high.value) {
          this.borderPrices.high.value = this.example_trips[i].price;
          this.borderPrices.high.trips = [this.example_trips[i]];
        } else if (this.example_trips[i].price == this.borderPrices.high.value) {
          this.borderPrices.high.trips.push(this.example_trips[i]);
        }

        if (this.example_trips[i].price < this.borderPrices.low.value) {
          this.borderPrices.low.value = this.example_trips[i].price;
          this.borderPrices.low.trips = [this.example_trips[i]];
        } else if (this.example_trips[i].price == this.borderPrices.low.value) {
          this.borderPrices.low.trips.push(this.example_trips[i]);
        }
      }
    }
  }

  addTripReservation(trip: TripStructure) {
    let index = this.example_trips.indexOf(trip);
    this.example_trips[index].availableSeats = this.example_trips[index].availableSeats - 1;
    this.actualReservations++;
  }

  removeTripReservation(trip: TripStructure) {
    let index = this.example_trips.indexOf(trip);
    this.example_trips[index].availableSeats = this.example_trips[index].availableSeats + 1;
    this.actualReservations--;
  }

  removeTrip(tripToRemove: TripStructure) {
    this.example_trips = this.example_trips.filter(obj => obj !== tripToRemove);
    this.actualReservations = this.actualReservations - (tripToRemove.maxSeats - tripToRemove.availableSeats);
  }

  rateTrip(trip: TripStructure, rate: number) {
    let index = this.example_trips.indexOf(trip);
    let tripValueRate = this.example_trips[index].rate;
    let tripValueRatedCount = this.example_trips[index].rated_count;
    let newValueRate;
    if (tripValueRatedCount == 0) {
      newValueRate = rate;
    } else {
      newValueRate = ((tripValueRate*tripValueRatedCount) + rate) / (tripValueRatedCount + 1);
    }
    this.example_trips[index].rate = newValueRate;
    this.example_trips[index].rated_count = tripValueRatedCount + 1;
  }

}