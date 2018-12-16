import {AngularFirestore, CollectionReference, Query} from 'angularfire2/firestore';
import {Observable} from 'rxjs';
import {Order, OrderStatus} from "./../models/order";
import { Injectable } from "@angular/core";
import {ProductService} from "./product.service";
import {Product} from "../models/product";
import {OrderProduct} from "../models/orderProduct";
import {AuthService} from "./auth.service";
import {ToastrService} from "./toastr.service";
import {HttpHeaders} from "@angular/common/http";
import {HttpClient} from "@angular/common/http";
import * as _ from 'lodash';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: "root"
})
export class OrderService {

  constructor(private db: AngularFirestore,
              private productService: ProductService,
              private authService: AuthService,
              private toastrService: ToastrService,
              private http: HttpClient
  ) { }

  getOrders(orderStatus: OrderStatus): Observable<any[]> {
    const db = this.db.collection('/order', ref => ref.where('status','==',orderStatus));
    return db.valueChanges();
  }

  getOrdersByUserId(userId : string) : Observable<any[]> {
    const db = this.db.collection('/order', ref => ref.where('userId','==',userId));
    return db.valueChanges();
  }

  getOrder(id: string): Observable<any> {
    return this.db.collection('/order').doc(id).valueChanges();
  }

  updateOrder(order: Order) {
    this.db.collection('/order').doc(order.id).set(Object.assign({}, order))
      .then(function() {
        console.log("Pomyślnie zaktualizowano zamówienie " + order.id);
      });
  }

  realizeOrder(order: Order) {
    order.products.forEach((orderProduct) => {
      orderProduct.isChecked = true;
      this.productService.decrementProductAmount(orderProduct.product.id,orderProduct.product.quantity);
    });
    order.status = OrderStatus.COMPLETED;
    order.sendDate = new Date();
    this.updateOrder(order);
  }

  makeOrder(result: any, basket: Product[], totalSum: number) {
    const orderProduct = basket.map(basketItem => Object.assign({}, new OrderProduct(this.db.createId(),false, basketItem)));
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
