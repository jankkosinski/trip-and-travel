import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-trips-navbar',
  templateUrl: './trips-navbar.component.html',
  styleUrls: ['./trips-navbar.component.css']
})
export class TripsNavbarComponent implements OnInit {

  @Input() reservationsCount: number;
  @Output() openCartSidebar = new EventEmitter;

  constructor() { }

  ngOnInit(): void {
  }

  openCart(): void {
    this.openCartSidebar.emit();
  }

}
