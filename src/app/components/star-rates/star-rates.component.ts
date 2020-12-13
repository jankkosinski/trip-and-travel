import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-star-rates',
  templateUrl: './star-rates.component.html',
  styleUrls: ['./star-rates.component.css']
})
export class StarRatesComponent implements OnInit {

  starClassName = "star-rating-blank";
  @Input() starId: number;
  @Input() rating: number;
  @Input() hover: number;

  @Output() leave: EventEmitter<number> = new EventEmitter();
  @Output() hoverStar: EventEmitter<number> = new EventEmitter();
  @Output() bigClick: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    if (this.rating >= this.starId) {
      this.starClassName = "star-rating-filled";
    }
  }

  onHover(): void {
    this.hoverStar.emit(this.starId);
  }

  onLeave(): void {
    this.leave.emit();
  }

  starClicked(): void {
    this.bigClick.emit(this.starId);
  }

}
