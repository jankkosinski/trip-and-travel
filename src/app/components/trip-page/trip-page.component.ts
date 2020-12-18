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

  trip: TripStructure = {
    id: "",
    name: "",
    destination: "",
    start_date: "",
    end_date: "",
    price: null,
    availableSeats: null,
    maxSeats: null,
    description: "",
    img: "",
    rate: null,
    rated_count: null
  };

  stars: number[] = [1, 2, 3, 4, 5];

  constructor(private route: ActivatedRoute, private tripDataService: TripsDataService) { 
    tripDataService.tripsDataList.subscribe(
      tripData => {
        this.trip = tripData.find(obj => obj.id === this.route.snapshot.paramMap.get('id'));
      }
    )
  }

  ngOnInit(): void {
  }

  getTripRate(): string {
    return (Math.round(this.trip.rate * 100) / 100).toFixed(2);
  }

}
