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

  getOrders(orderStatus: OrderStatus): Observable<Order[]> {
    return this.http
      .get<Order[]>("http://localhost:3000/orders/status/"+orderStatus)
      .pipe(map(data => _.values(data)));
  }

  getOrdersByUserId(userId : string) : Observable<Order[]> {
    return this.http
      .get<Order[]>("http://localhost:3000/orders/user/"+userId)
      .pipe(map(data => _.values(data)));
  }

  getOrder(id: string): Observable<Order> {
    return this.http
      .get<Order>("http://localhost:3000/orders/"+id)
      .pipe(map(data => _.values(data)));
  }

  createOrder(order: Order) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    this.http.post<Product>('http://localhost:3000/orders', order, httpOptions)
      .subscribe(p => this.toastrService.success("Zamówienie złożone!",""));
  }

  updateOrder(order: Order) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    this.http.put<Product>('http://localhost:3000/orders/'+order.id, order, httpOptions)
      .subscribe(p => this.toastrService.success("Zamówienie zaktualizowane!",""));
  }

  realizeOrder(order: Order) {
    order.products.forEach((orderProduct) => {
      this.toastrService.info("order product id " , orderProduct.id);
      if (orderProduct.isChecked === false) {
        this.toastrService.success("Mamy checked na false","");
      }
      orderProduct.isChecked = true;
      // this.productService.decrementProductAmount(orderProduct.product.id,orderProduct.product.quantity);
    });
    order.status = OrderStatus.COMPLETED;
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
    this.createOrder(order);
  }
}
