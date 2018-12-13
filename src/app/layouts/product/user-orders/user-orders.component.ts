import { Component, OnInit } from '@angular/core';
import {Order} from "../../../shared/models/order";
import {Observable} from "rxjs";
import {OrderService} from "../../../shared/services/order.service";
import {ToastrService} from "../../../shared/services/toastr.service";
import {ProductService} from "../../../shared/services/product.service";
import {AuthService} from "../../../shared/services/auth.service";

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.scss']
})
export class UserOrdersComponent implements OnInit {

  orderList: Observable<Order[]>;

  constructor(private orderService : OrderService, private toastrService : ToastrService, private productService : ProductService, private authService : AuthService) { }

  ngOnInit() {
    this.orderList = this.orderService.getOrdersByUserId(this.authService.data.id);
  }

}
