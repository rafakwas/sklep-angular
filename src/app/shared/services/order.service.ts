import {AngularFirestore, CollectionReference, Query} from 'angularfire2/firestore';
import {Observable} from 'rxjs';
import {Order, OrderStatus} from "./../models/order";
import { Injectable } from "@angular/core";
import {ProductService} from "./product.service";
import {Product} from "../models/product";
import {OrderProduct} from "../models/orderProduct";
import {AuthService} from "./auth.service";
import {ToastrService} from "./toastr.service";

@Injectable({
  providedIn: "root"
})
export class OrderService {

  constructor(private db: AngularFirestore,
              private productService: ProductService,
              private authService: AuthService,
              private toastrService: ToastrService
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
        this.toastrService.info("Order successfully added",order.id);
      });
  }

  // realizeProduct(orderProduct: OrderProduct) : OrderProduct {
  //   const orderedQuantity = orderProduct.product.quantity;
  //   console.log("Zamówiona ilość: " + orderedQuantity);
  //   this.productService.getProduct(orderProduct.product.id).subscribe(databaseProduct => {
  //     this.toastrService.success("znaleziono produkt " + databaseProduct.id,databaseProduct.quantity + " vs " + orderedQuantity);
  //     if (databaseProduct.quantity < orderProduct.product.quantity) {
  //       this.toastrService.error("Za malo produktów w magazynie!","");
  //       return orderProduct;
  //     } else {
  //       // databaseProduct.quantity -= orderedQuantity;
  //       // this.productService.updateProduct(databaseProduct);
  //       orderProduct.isChecked = true;
  //       return orderProduct;
  //     }
  //   });
  //   throw Error();
  //
  // }

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
