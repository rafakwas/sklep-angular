import { Component, OnInit } from '@angular/core';
import {NgForm, FormGroup, Validators, FormControl} from '@angular/forms';
import { ProductService } from 'src/app/shared/services/product.service';
import { Product } from 'src/app/shared/models/product';
import {ToastrService} from "../../../shared/services/toastr.service";

declare var $: any;
declare var require: any;
declare var toastr: any;
const shortId = require('shortid');
const moment = require('moment');


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  productForm : FormGroup;
  constructor(private productService: ProductService, private toastrService: ToastrService) {}

  ngOnInit() {
    this.productForm = this.createFormGroup();
  }

  createFormGroup() {
    return new FormGroup({
      name: new FormControl('',[Validators.required,Validators.minLength(2)]),
      category: new FormControl('',[Validators.required,Validators.minLength(2)]),
      price: new FormControl('',Validators.required),
      description: new FormControl('',Validators.required),
      imageUrl: new FormControl('',[Validators.required]),
      quantity: new FormControl('',[Validators.required,Validators.min(1)])
    });
  }

  createProduct() {
    var product = new Product();
    product.name = this.productForm.value['name'];
    product.category = this.productForm.value['category'];
    product.price = this.productForm.value['price'];
    product.description = this.productForm.value['description'];
    product.imageUrl =this.productForm.value['imageUrl'];
    product.quantity = this.productForm.value['quantity'];
    product.productAdded = moment().unix();
    this.productService.createProduct(product);
    toastr.success('product ' + product + 'is added successfully', 'Product Creation');
  }

}
