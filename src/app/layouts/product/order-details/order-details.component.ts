import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from "../../../shared/services/toastr.service";
import {OrderProduct} from "../../../shared/models/orderProduct";
import {Order, OrderStatus} from "../../../shared/models/order";
import {OrderService} from "../../../shared/services/order.service";
import {Observable} from "rxjs";
import {ProductService} from "../../../shared/services/product.service";
import {first} from "rxjs/internal/operators";


@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

  order = new Order();
  orderProducts = [];
  constructor(private toastrService: ToastrService,
              private orderService: OrderService,
              private productService: ProductService,
              private _router: Router) {
  }

  ngOnInit(
  ) {
    this.orderProducts = this.order.products;
  }

  onBack(): void {
    this._router.navigate(['/product/all-orders']);
  }

  completeSingleOrderProduct(orderProduct: OrderProduct) {
    this.order.products.filter(x => x.id === orderProduct.id).forEach(x => {
      x.isChecked = true;
      this.productService.decrementProductAmount(x.product.id,x.product.quantity);
    });
    let unchecked = this.order.products.filter(x => !x.isChecked).length;
    console.log("unchecked : " + unchecked);
    if (unchecked == 0) {
      this.toastrService.success("Zamówienie skompletowane w całości!","");
      this.order.status = OrderStatus.COMPLETED;
      this.order.sendDate = new Date();
    } else {
      this.toastrService.success("Zamówienie skompletowane po części!","");
      this.order.status = OrderStatus.IN_PROGRESS;
    }
    this.orderService.updateOrder(this.order);
  };
}
