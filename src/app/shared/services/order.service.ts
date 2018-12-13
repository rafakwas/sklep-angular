import {AngularFirestore, CollectionReference, Query} from 'angularfire2/firestore';
import {Observable} from 'rxjs';
import {Order, OrderStatus} from "./../models/order";
import { Injectable } from "@angular/core";
import {ProductService} from "./product.service";
import {Product} from "../models/product";
import {OrderProduct} from "../models/orderProduct";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: "root"
})
export class OrderService {

  constructor(private db: AngularFirestore,
              private productService: ProductService,
              private authService: AuthService
  ) { }

  getOrders(orderStatus: OrderStatus): Observable<any[]> {
    const db = this.db.collection('/order', ref => ref.where('status','==',orderStatus));
    return db.valueChanges();
  }

  getOrdersByUserId(userId : string) : Observable<any[]> {
    const db = this.db.collection('/order', ref => ref.where('userId','==',userId));
    return db.valueChanges();
  }

  updateOrder(order: Order) {
    this.db.collection('/order').doc(order.id).set(Object.assign({}, order))
      .then(function() {
        console.log('Order successfully added:', order);
      });
  }

  realizeProduct(orderProduct: OrderProduct) {
    const orderedQuantity = orderProduct.product.quantity;
    console.log("Ordered quantity: " + orderedQuantity);
    console.log("Id sprawdzanego produktu: " + orderProduct.product.id);
    this.productService.getProduct(orderProduct.product.id).subscribe(p => {
      console.log("W magazynie jest: " + p.quantity);
      if (p.quantity < orderedQuantity) {
        console.log("Brakło w magazynie");
        return orderProduct;
      } else {
        p.quantity -= orderedQuantity;
        this.productService.updateProduct(p);
      }
    });
    orderProduct.isChecked = true;
    return orderProduct;
  }

  realizeOrder(order: Order) {
    console.log("Produkty w obrębie zamówienia zrealizowane");
    if (order.products.filter(x => !x.isChecked).length > 0) {
      console.log("Znalazły się produkty, których nie ma na stanie");
      order.status = OrderStatus.IN_PROGRESS;
    } else {
      console.log("Możemy skompletować zamówienie - wszystkie produkty spakowane");
      order.status = OrderStatus.COMPLETED;
      order.sendDate = new Date();
    }
    this.updateOrder(order);
  }

  makeOrder(result: any, basket: Product[], totalSum: number) {
    const orderProduct = basket.map(basketItem => Object.assign({}, new OrderProduct(false, basketItem)));
    var userId = null;
    if (this.authService.isSignedIn()) {
      userId = this.authService.data.id;
    }
    const order = new Order(
      userId,
      result.firstname,
      result.lastname,
      result.email,
      result.address,
      result.postalCode,
      result.city,
      result.phone,
      totalSum,
      orderProduct);
    order.id = this.db.createId();
    this.updateOrder(order);
  }
}
