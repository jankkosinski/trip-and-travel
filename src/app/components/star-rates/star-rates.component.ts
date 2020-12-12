import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-star-rates',
  templateUrl: './star-rates.component.html',
  styleUrls: ['./star-rates.component.css']
})
export class StarRatesComponent implements OnInit {

  starClassName = "star-rating-blank";
  @Input() starId;
  @Input() rating;
  @Input() hover;

  @Output() leave: EventEmitter<number> = new EventEmitter();
  @Output() hoverStar: EventEmitter<number> = new EventEmitter();
  @Output() bigClick: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    if (this.rating >= this.starId) {
      this.starClassName = "star-rating-filled";
    }
  }

  onHover() {
    this.hoverStar.emit(this.starId);
  }

  onLeave() {
    this.leave.emit();
  }

  starClicked() {
    this.bigClick.emit(this.starId);
  }

}
