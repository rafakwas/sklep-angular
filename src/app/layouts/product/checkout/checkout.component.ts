import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductService } from 'src/app/shared/services/product.service';
import { Product } from 'src/app/shared/models/product';
import {Order} from "src/app/shared/models/order";

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

  order: Order = new Order();
  constructor(
    private productService: ProductService
  ) {}

  ngOnInit() {
  }

  createOrder(orderForm: NgForm) {
    toastr.success('order to ' + orderForm.value['firstname'] + 'is set successfully', 'Order creation');
  }


}
