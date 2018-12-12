import { Component, OnInit } from '@angular/core';
import {Order, OrderStatus} from "../../../shared/models/order";
import {OrderService} from "../../../shared/services/order.service";
import {ToastrService} from "../../../shared/services/toastr.service";
import {plainToClass, deserialize} from "class-transformer";
import {OrderProduct} from "../../../shared/models/orderProduct";
import {Observable} from "rxjs";

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  orderList: Observable<Order[]>;

  constructor(private orderService : OrderService, private toastrService : ToastrService) { }

  ngOnInit() {
    this.getAllOrders();
  }

  getAllOrders() {
    this.orderList = this.orderService.getOrders();
  }

  completeOrder(order : Order) {
    this.orderService.realizeOrder(order);
    // order.status = OrderStatus.COMPLETED;
    // order.sendDate = new Date();
    // var orderProducts = [];
    // orderProducts = Object.assign({},order.products);
    // this.toastrService.info("sprawdzenie",orderProducts);
    // orderProducts.forEach((orderProduct) => {1
    //   this.toastrService.info("hello","hlelo");
    //
    // });
      // products = JSON.parse(JSON.stringify(order.products));
    // products.forEach((orderProduct) => {
    //   orderProduct.isChecked = true;
    // });
    // order.products = Object.assign({},products);
    // this.orderService.updateOrder(order);
  }

  getCompletedOrderStatus() {
    return OrderStatus.COMPLETED;
  }
}
