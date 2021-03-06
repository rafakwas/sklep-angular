import {Component, OnInit} from "@angular/core";
import {FormGroup, Validators, FormControl} from "@angular/forms";
import {ProductService} from "src/app/shared/services/product.service";
import {OrderService} from "../../../shared/services/order.service";
import {Router} from "@angular/router";
import {CartService} from "../../../shared/services/cart.service";
import {AuthService} from "../../../shared/services/auth.service";

declare var $: any;
declare var require: any;
declare var toastr: any;
const shortId = require('shortid');
const moment = require('moment');
const _ = require('lodash');

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
    private cartService: CartService,
    private authService: AuthService,
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
    let cartProducts = this.cartService.getLocalCartProducts();
    let totalPrice = this.cartService.calculateCartProductsPrice();
    this.orderService.makeOrder(order,cartProducts,totalPrice);
    this.cartService.freeLocalCart();
    toastr.success('Zamówienie do ' + order.email + ' zostało złożone', 'Tworzenie zamówienia');
    this.router.navigateByUrl('/products/all-products');
  }

}
