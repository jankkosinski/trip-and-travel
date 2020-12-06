import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-trips-navbar',
  templateUrl: './trips-navbar.component.html',
  styleUrls: ['./trips-navbar.component.css']
})
export class TripsNavbarComponent implements OnInit {

  @Input() reservations: number;

  constructor() { }

  ngOnInit(): void {
  }

}
