import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-trip',
  templateUrl: './new-trip.component.html',
  styleUrls: ['./new-trip.component.css']
})
export class NewTripComponent implements OnInit {

  panelOpenState: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
