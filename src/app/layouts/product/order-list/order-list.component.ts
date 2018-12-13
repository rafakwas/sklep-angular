import { Component, OnInit } from '@angular/core';
import {Order, OrderStatus} from "../../../shared/models/order";
import {OrderService} from "../../../shared/services/order.service";
import {ToastrService} from "../../../shared/services/toastr.service";
import {plainToClass, deserialize} from "class-transformer";
import {OrderProduct} from "../../../shared/models/orderProduct";
import {Observable} from "rxjs";
import {ProductService} from "../../../shared/services/product.service";
import {Product} from "../../../shared/models/product";

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  orderList: Observable<Order[]>;
  status = OrderStatus.AWAITING;

  constructor(private orderService : OrderService, private toastrService : ToastrService, private productService : ProductService) { }

  ngOnInit() {
    this.orderList = this.orderService.getOrders(this.status);
  }

  getOrders() {
    this.orderList = this.orderService.getOrders(this.status);
  }

  completeOrder(order : Order) {
    this.orderService.realizeOrder(order);
  }

  completeSingleOrderProduct(order: Order, orderProduct :OrderProduct) {
    this.toastrService.success("Kompletuję przedmiot " + orderProduct.product.name, "Zamówienie nr " + order.id);
    this.orderService.realizeProduct(order,orderProduct);
  }

  // canCompleteSingleOrderItem(product : Product) {
  //   this.productService.getProduct(product.id).subscribe((databaseProduct) => {
  //     return databaseProduct.quantity >= product.quantity;
  //   });
  // }

  filter(orderStatus : OrderStatus) {
    this.status = orderStatus;
    this.getOrders();
  }

  canSubmitAll(order : Order) {
    // order.products.forEach((orderProduct) => {
    //   let orderQuantity = orderProduct.product.quantity;
    //   let actualProduct = this.productService.getProduct(orderProduct.product.id);
    //   let actualQuantity = actualProduct.quantity;
    //   this.toastrService.info("jestem tu","hehe");
    //   if (actualQuantity > orderQuantity) {
    //     return false;
    //   }
    // });
    // return true;
  }

  getCompletedOrderStatus() {
    return OrderStatus.COMPLETED;
  }
}
