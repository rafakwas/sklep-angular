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

  filter(orderStatus : OrderStatus) {
    this.status = orderStatus;
    this.getOrders();
  }

  getCompletedOrderStatus() {
    return OrderStatus.COMPLETED;
  }
}
