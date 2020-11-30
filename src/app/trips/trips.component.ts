import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { TripStructure } from './trips_structure';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})
export class TripsComponent implements OnInit {

  actualReservations = 0;

    example_trips: TripStructure[] = [
    { name: 'Weekend in Warsaw', destination: 'Warsaw', start_date: '01.01.2021', end_date: '31.01.2021', price: 1800, availableSeats: 5, maxSeats: 5, description: 'Lorem ipsum', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Panorama_siekierkowski.jpg/1800px-Panorama_siekierkowski.jpg' },
    { name: 'Torun\'s Pastries', destination: 'Torun', start_date: '01.02.2021', end_date: '28.02.2021', price: 750, availableSeats: 10, maxSeats: 10, description: 'Lorem ipsum', img: 'https://bi.im-g.pl/im/33/db/17/z25016371V.jpg' },
    { name: 'Zakopane for sports', destination: 'Zakopane', start_date: '01.04.2021', end_date: '30.04.2021', price: 1350, availableSeats: 15, maxSeats: 15, description: 'Lorem ipsum', img: 'https://ocdn.eu/pulscms-transforms/1/imJk9kpTURBXy80MTZlNDUyZGU0ZjY3MDRhYzI3OGY3Y2I5YjM2MWY2Zi5qcGeTlQMAzKrNFUHNC_STBc0DFM0BvJMJpjlhN2Y1MwaBoTAB/zakopane-i-tatry-noca.jpg' },
    { name: 'Truth about Kazimierz', destination: 'Kazimierz The Great', start_date: '01.05.2021', end_date: '31.05.2021', price: 450, availableSeats: 20, maxSeats: 20, description: 'Lorem ipsum', img: 'https://krakow.pl/zalacznik/295939/4.jpg' },
    { name: 'History of Cracow', destination: 'Cracow', start_date: '01.06.2021', end_date: '30.06.2021', price: 800, availableSeats: 5, maxSeats: 5, description: 'Lorem ipsum', img: 'https://meteor-turystyka.pl/images/places/0/28.jpg' },
    { name: 'Sunny Baltic Sea', destination: 'Kolobrzeg', start_date: '01.07.2021', end_date: '31.07.2021', price: 950, availableSeats: 35, maxSeats: 35, description: 'Lorem ipsum', img: 'https://przegladbaltycki.pl/wp-content/uploads/2020/09/Kolobrzeg-molo.jpg' },
    { name: 'Masuria on sails', destination: 'Elk', start_date: '01.08.2021', end_date: '31.08.2021', price: 300, availableSeats: 10, maxSeats: 10, description: 'Lorem ipsum', img: 'https://pliki.portalsamorzadowy.pl/i/15/27/91/152791_r0_940.jpg' },
  ];

  constructor() { }

  ngOnInit(): void {
  }

  addReservation(trip_idx) {
    this.example_trips[trip_idx].availableSeats = this.example_trips[trip_idx].availableSeats - 1;
    this.actualReservations++;
  }

  removeReservation(trip_idx) {
    this.example_trips[trip_idx].availableSeats = this.example_trips[trip_idx].availableSeats + 1; 
    this.actualReservations--;
  }

}
