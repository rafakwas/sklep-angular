import {
  AngularFireList,
  AngularFireObject,
  AngularFireDatabase
} from "angularfire2/database";
import { Order } from "./../models/order";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class OrderService {

  orders: AngularFireList<Order>;

  constructor(private db: AngularFireDatabase) {
    this.getOrders();
  }

  createOrder(data: Order) {
    this.orders.push(data);
  }

  getOrders() {
    this.orders = this.db.list("orders");
    return this.orders;
  }

  updateOrder(data: Order) {
    this.orders.update(data.$key, data);
  }

  deleteOrder(key: string) {
    this.orders.remove(key);
  }
}
