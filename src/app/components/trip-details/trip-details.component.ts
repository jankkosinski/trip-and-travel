import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TripStructure } from '../../models/trips_structure';

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
  @Output() onRateTrip =new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  stars = [1, 2, 3, 4, 5];
  hoverState = 0;

  hoverStar(starId) {
    this.hoverState = starId;
  }

  clearStarHover() {
    this.hoverState = 0;
  }

  updateRating(starId) {
    this.hoverState = 0;
    this.onRateTrip.emit(starId);
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

  getTripRate() {
    return (Math.round(this.trip.rate * 100) / 100).toFixed(2);
  }

}
