import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Basket } from "../models/reservation_structure"

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  private basketDataCollection: AngularFirestoreCollection<Basket>;
  basketDataList: Observable<Basket[]>;

  constructor(private db: AngularFirestore) { 
    this.basketDataCollection = this.db.collection<Basket>('/baskets');
    this.basketDataList = this.basketDataCollection.valueChanges({ idField: 'id'});
  }

  addUserBasket(userID: string) {
    let basket: Basket = {
      id: "newBasket",
      user_id: userID,
      reservation_list: []
    }
    delete basket.id;
    return this.basketDataCollection.add(basket);
  }

  deleteUserBasket(basket: Basket) {
    const id: string = basket.id;
    this.basketDataCollection.doc(id).delete();
  }

  addBasketReservation(basket: Basket, reservationID: string) {
    const id: string = basket.id;
    basket.reservation_list.push(reservationID);
    delete basket.id;
    return this.basketDataCollection.doc(id).update(basket);
  }

  removeBasketReservation(basket: Basket, reservationID: string) {
    const id: string = basket.id;
    basket.reservation_list = basket.reservation_list.filter(items => items !== reservationID);
    delete basket.id;
    this.basketDataCollection.doc(id).update(basket);
  }

  clearBasket(basket: Basket) {
    const id: string = basket.id;
    basket.reservation_list = [];
    delete basket.id;
    return this.basketDataCollection.doc(id).update(basket);
  }
  
}
