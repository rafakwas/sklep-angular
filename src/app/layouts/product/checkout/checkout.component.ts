import { Component, OnInit } from '@angular/core';
import {FormsModule, ReactiveFormsModule, FormGroup, Validators, FormControl, NgForm} from "@angular/forms";
import { ProductService } from 'src/app/shared/services/product.service';
import { Product } from 'src/app/shared/models/product';
import {Order, OrderStatus} from "src/app/shared/models/order";
import {OrderService} from "../../../shared/services/order.service";
import {Router} from "@angular/router";

declare var $: any;
declare var require: any;
declare var toastr: any;
const shortId = require('shortid');
const moment = require('moment');

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  orderForm : FormGroup;

  constructor(
    private productService: ProductService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit() {
    this.orderForm = this.createFormGroup();
  }

  createFormGroup() {
    return new FormGroup({
      firstname: new FormControl('',[Validators.required,Validators.minLength(2)]),
      lastname: new FormControl('',[Validators.required,Validators.minLength(2)]),
      address: new FormControl('',Validators.required),
      city: new FormControl('',Validators.required),
      postalCode: new FormControl('',[Validators.required,Validators.pattern(/^\d{2}-\d{3}$/)]),
      phone: new FormControl('',[Validators.required,Validators.minLength(7)]),
      email: new FormControl('',[Validators.required,Validators.email])
    });
  }

  createOrder() {
    var order = this.orderForm.value;
    order.products = this.productService.getLocalCartProducts();
    order.status = OrderStatus.AWAITING;
    let totalPrice = 0;
    let cartProducts = this.productService.getLocalCartProducts();
    cartProducts.forEach((product) => {
      totalPrice += product.price*product.quantity;
      delete product['$key'];
    });
    order.totalPrice = totalPrice;
    this.orderService.createOrder(order);
    this.productService.freeLocalCart();
    toastr.success('order to ' + order.email + 'is set successfully', 'Order creation');
    this.router.navigateByUrl('/products/all-products');
  }

}
