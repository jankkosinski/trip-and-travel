import { Component, OnInit } from '@angular/core';
import { TripStructure } from "../../models/trips_structure"

@Component({
  selector: 'app-trip-page',
  templateUrl: './trip-page.component.html',
  styleUrls: ['./trip-page.component.css']
})
export class TripPageComponent implements OnInit {

  trip: TripStructure = {
    id: 1,
    name: 'Weekend in Warsaw',
    destination: 'Warsaw',
    start_date: '2021-01-21',
    end_date: '2021-02-02',
    price: 1800,
    availableSeats: 5,
    maxSeats: 5,
    description: "The city rose to prominence in the late 16th century, when Sigismund III decided to move the Polish capital and his royal court from Kraków. The elegant architecture, grandeur and extensive boulevards earned Warsaw the nickname Paris of the North prior to the Second World War.",
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Panorama_siekierkowski.jpg/1800px-Panorama_siekierkowski.jpg',
    rate: 3,
    rated_count: 4
}

stars: number[] = [1, 2, 3, 4, 5];

  constructor() { }

  ngOnInit(): void {
  }

  getTripRate(): string {
    return (Math.round(this.trip.rate * 100) / 100).toFixed(2);
  }

}
