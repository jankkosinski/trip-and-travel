import { Component, OnInit } from '@angular/core';
import { TripStructure } from '../../models/trips_structure';
import { TripsDataService } from '../../services/trips-data.service';

@Component({
  selector: 'app-new-trip',
  templateUrl: './new-trip.component.html',
  styleUrls: ['./new-trip.component.css']
})
export class NewTripComponent implements OnInit {

  trip: TripStructure = <TripStructure>{};
  panelOpenState: boolean = false;

  constructor(private tripDataService: TripsDataService) { }

  ngOnInit(): void {
  }

  saveNewTrip(): void {
    console.log(this.trip);
  }

  clearData(): void {

  }

}
