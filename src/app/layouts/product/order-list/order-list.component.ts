import { Component, OnInit } from '@angular/core';
import {Order} from "../../../shared/models/order";
import {OrderService} from "../../../shared/services/order.service";
import {ToastrService} from "../../../shared/services/toastr.service";

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  orderList: Order[];

  constructor(private orderService : OrderService, private toastrService : ToastrService) { }

  ngOnInit() {
    this.getAllOrders();
  }

  getAllOrders() {
    const x = this.orderService.getOrders();
    x.snapshotChanges().subscribe(
      (order) => {
        this.orderList = [];
        order.forEach((element) => {
          const y = element.payload.toJSON();
          y['$key'] = element.key;
          this.orderList.push(y as Order);
        });
      },
      (err) => {
        this.toastrService.error('Błąd podczas pobierania zamówień', err);
      }
    );
  }

}
