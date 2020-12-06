import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TripStructure } from '../models/trips_structure';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.css']
})
export class TripDetailsComponent implements OnInit {

  @Input() trip: TripStructure;
  @Output() onAddReservation = new EventEmitter();
  @Output() onRemoveReservation = new EventEmitter();
  @Output() onRemoveTrip = new EventEmitter();

  

  constructor() { }

  ngOnInit(): void {
  }

  addReservation () {
    this.onAddReservation.emit(this.trip);
  }

  removeReservation () {
    this.onRemoveReservation.emit(this.trip);
  }

  removeTrip () {
    this.onRemoveTrip.emit(this.trip);
  }

  checkColor (value) {
    if (value == 0) {
      return "color: red";
    } else if (value <= 3) {
      return "color: orange";
    } else {
      return "";
    }
  }

}
