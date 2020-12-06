import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { TripStructure } from '../models/trips_structure';
import { EXAMPLE_TRIPS } from '../models/trips-data'

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})

export class TripsComponent implements OnInit {

  actualReservations = 0;

  example_trips: TripStructure[] = EXAMPLE_TRIPS;

  borderPrices = {
    low: {value: 0, trips: []}, 
    high: {value: 0, trips: []}
  };

  constructor() { 
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

  ngOnInit(): void {
  }

  addTripReservation(trip: TripStructure) {
    for (let i = 0;  i < this.example_trips.length; i++) {
      if (this.example_trips[i] == trip) {
        this.example_trips[i].availableSeats = this.example_trips[i].availableSeats - 1;
        this.actualReservations++;
      }
    }
  }

  removeTripReservation(trip: TripStructure) {
    for (let i = 0;  i < this.example_trips.length; i++) {
      if (this.example_trips[i] == trip) {
        this.example_trips[i].availableSeats = this.example_trips[i].availableSeats + 1;
        this.actualReservations--;
      }
    }
  }

  removeTrip(tripToRemove: TripStructure) {
    this.example_trips = this.example_trips.filter(obj => obj !== tripToRemove);
    this.actualReservations = this.actualReservations - (tripToRemove.maxSeats - tripToRemove.availableSeats);
  }

}
