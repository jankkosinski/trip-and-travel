import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Basket, Order } from "../models/reservation_structure"

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private orderDataCollection: AngularFirestoreCollection<Order>;
  orderDataList: Observable<Order[]>;

  constructor(private db: AngularFirestore) { 
    this.orderDataCollection = this.db.collection<Order>('/orders');
    this.orderDataList = this.orderDataCollection.valueChanges({ idField: 'id'});
  }

  addUserOrder(userID: string, basket: Basket) {
    let order: Order = {
      id: "newOrder",
      user_id: userID,
      reservation_list: basket.reservation_list
    }
    delete order.id;
    return this.orderDataCollection.add(order);
  }

  deleteUserOrder(order: Order) {
    const id: string = order.id;
    this.orderDataCollection.doc(id).delete();
  }

}
