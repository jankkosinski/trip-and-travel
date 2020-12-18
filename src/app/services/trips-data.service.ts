import { Injectable } from '@angular/core';
import { TripStructure } from '../models/trips_structure';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class TripsDataService {

  private tripDataCollection: AngularFirestoreCollection<TripStructure>;
  tripsDataList: Observable<TripStructure[]>;
  
  constructor(private db: AngularFirestore) {
    this.tripDataCollection = this.db.collection<TripStructure>('/trips');
    this.tripsDataList = this.tripDataCollection.valueChanges({ idField: 'id'});
   }

   addProduct(trip: TripStructure) {
     delete trip.id;
     this.tripDataCollection.add(trip);
   }

   deleteProduct(trip: TripStructure) {
    const id: string = trip.id;
    this.tripDataCollection.doc(id).delete();
   }

   updateProduct(trip: TripStructure) {
    const id: string = trip.id;
    delete trip.id;
    this.tripDataCollection.doc(id).update(trip);
   }

}
