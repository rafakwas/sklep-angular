import { Component, OnInit } from '@angular/core';
import {FormsModule, ReactiveFormsModule, FormGroup, Validators, FormControl, NgForm} from "@angular/forms";
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
  orderForm : FormGroup;

  constructor(
    private productService: ProductService
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
    toastr.success('order to ' + this.orderForm.value + 'is set successfully', 'Order creation');
  }

}
