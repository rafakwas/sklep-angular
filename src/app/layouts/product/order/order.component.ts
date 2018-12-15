import { Component, OnInit, Input } from '@angular/core';
import {OrderDetailsComponent} from "../order-details/order-details.component";
import {OrderStatus, Order} from "../../../shared/models/order";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {OrderService} from "../../../shared/services/order.service";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  @Input() order : Order;

  constructor(
    private orderService : OrderService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
  }

  completeOrder() {
    this.orderService.realizeOrder(this.order);
  }

  getCompletedOrderStatus() {
    return OrderStatus.COMPLETED;
  }

  openOrderCompletingModal() {
    const modalRef = this.modalService.open(OrderDetailsComponent);
    modalRef.componentInstance.order = this.order;
  }
}
