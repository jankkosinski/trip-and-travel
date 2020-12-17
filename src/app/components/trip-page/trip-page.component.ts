import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TripStructure } from "../../models/trips_structure"
import { TripsDataService } from "../../services/trips-data.service"

@Component({
  selector: 'app-trip-page',
  templateUrl: './trip-page.component.html',
  styleUrls: ['./trip-page.component.css']
})
export class TripPageComponent implements OnInit {

  trip: TripStructure;

  stars: number[] = [1, 2, 3, 4, 5];

  constructor(private route: ActivatedRoute, private tripDataService: TripsDataService) { }

  ngOnInit(): void {
    let id: string = this.route.snapshot.paramMap.get('id')
    this.trip = this.tripDataService.getProduct(+id);
  }

  getTripRate(): string {
    return (Math.round(this.trip.rate * 100) / 100).toFixed(2);
  }

}
