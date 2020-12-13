import { Injectable } from '@angular/core';
import { TripStructure } from '../models/trips_structure';
import { EXAMPLE_TRIPS } from '../models/trips-data';

@Injectable({
  providedIn: 'root'
})
export class TripsDataService {

  private tripsDataList: TripStructure[] = [];

  constructor() {
    this.tripsDataList = EXAMPLE_TRIPS;
   }

   getProducts(): TripStructure[] {
    return this.tripsDataList;
   }

   getProduct(trip: TripStructure): TripStructure {
    let index = this.tripsDataList.indexOf(trip);
    return this.tripsDataList[index];
   }

   addProduct(trip: TripStructure): TripStructure[] {
     this.tripsDataList.push(trip);
     return this.tripsDataList;
   }

   deleteProduct(trip: TripStructure): TripStructure[] {
    this.tripsDataList = this.tripsDataList.filter(obj => obj !== trip);
    return this.tripsDataList;
   }

   updateProduct(trip: TripStructure, key: string, newValue): TripStructure[] {
    let index = this.tripsDataList.indexOf(trip);
    this.tripsDataList[index][key] = newValue;
    return this.tripsDataList;
   }

}
