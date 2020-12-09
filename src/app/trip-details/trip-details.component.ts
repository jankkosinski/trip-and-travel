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

  stars = [1, 2, 3, 4, 5];
  hoverState = 0;
  rating = 0;

  hoverStar(starId) {
    this.hoverState = starId;
  }

  clearStarHover() {
    this.hoverState = 0;
  }

  updateRating(starId) {
    this.rating = starId;
    this.hoverState = 0;
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
