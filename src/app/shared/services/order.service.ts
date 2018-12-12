import {AngularFirestore, CollectionReference, Query} from 'angularfire2/firestore';
import {Observable} from 'rxjs';
import {Order, OrderStatus} from "./../models/order";
import { Injectable } from "@angular/core";
import {ProductService} from "./product.service";
import {Product} from "../models/product";
import {OrderProduct} from "../models/orderProduct";

@Injectable({
  providedIn: "root"
})
export class OrderService {

  constructor(private db: AngularFirestore,
              private productService: ProductService) { }


  getOrders() : Observable<any> {
    const db = this.db.collection('/order');
    return db.valueChanges();
  }

  updateOrder(order: Order) {
    this.db.collection('/order').doc(order.id).set(Object.assign({}, order))
      .then(function() {
        console.log('Order successfully added:', order);
      });
  }

  realizeOrder(order: Order) {
    order.products.forEach(productOrder => productOrder.isChecked = true);
    order.status = OrderStatus.COMPLETED;
    order.sendDate = new Date();
    this.updateOrder(order);
  }

  makeOrder(result: any, basket: Product[], totalSum: number) {
    const orderProduct = basket.map(basketItem => Object.assign({}, new OrderProduct(false, basketItem)));
    const order = new Order(
      result.firstname,
      result.lastname,
      result.email,
      result.address,
      result.postalCode,
      result.city,
      result.phone,
      totalSum,
      orderProduct);
    this.updateOrder(order);
  }
}
