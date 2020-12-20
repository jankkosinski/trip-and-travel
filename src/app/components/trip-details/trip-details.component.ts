import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TripStructure } from '../../models/trips_structure';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.css']
})
export class TripDetailsComponent implements OnInit {

  @Input() trip: TripStructure;
  @Input() userRole: string;
  @Output() onAddReservation = new EventEmitter();
  @Output() onRemoveReservation = new EventEmitter();
  @Output() onRemoveTrip = new EventEmitter();
  @Output() onRateTrip =new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  stars: number[] = [1, 2, 3, 4, 5];
  hoverState: number = 0;

  hoverStar(starId): void {
    this.hoverState = starId;
  }

  clearStarHover(): void {
    this.hoverState = 0;
  }

  updateRating(starId): void {
    this.hoverState = 0;
    this.onRateTrip.emit(starId);
  }

  addReservation(): void {
    this.onAddReservation.emit(this.trip);
  }

  removeReservation(): void {
    this.onRemoveReservation.emit(this.trip);
  }

  removeTrip(): void {
    this.onRemoveTrip.emit(this.trip);
  }

  getTripRate(): string {
    return (Math.round(this.trip.rate * 100) / 100).toFixed(2);
  }

}
