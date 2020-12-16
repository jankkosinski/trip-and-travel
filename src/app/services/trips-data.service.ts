import { Injectable } from '@angular/core';
import { TripStructure } from '../models/trips_structure';
import { EXAMPLE_TRIPS } from '../models/trips-data';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TripsDataService {

  private tripsDataList =  new BehaviorSubject<TripStructure[]>([]);
  
  constructor() {
    this.tripsDataList.next(EXAMPLE_TRIPS);
   }

   getProducts(): Observable<TripStructure[]> {
    return this.tripsDataList.asObservable();
   }

   getProduct(trip: TripStructure) {
    let index = this.tripsDataList.getValue().indexOf(trip);
    return this.tripsDataList[index].asObservable();
   }

   addProduct(trip: TripStructure) {
     let actualTripsData = this.tripsDataList.getValue();
     actualTripsData.push(trip);
     this.tripsDataList.next(actualTripsData);
   }

   deleteProduct(trip: TripStructure) {
    let actualTripsData = this.tripsDataList.getValue();
    actualTripsData = actualTripsData.filter(obj => obj !== trip);
    this.tripsDataList.next(actualTripsData);
   }

   updateProduct(trip: TripStructure, key: string, newValue) {
    let actualTripsData = this.tripsDataList.getValue();
    let index = actualTripsData.indexOf(trip);
    actualTripsData[index][key] = newValue;
    this.tripsDataList.next(actualTripsData);
   }

}
