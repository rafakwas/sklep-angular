import { Component, OnInit } from '@angular/core';
import {NgForm, FormGroup, Validators, FormControl} from '@angular/forms';
import { ProductService } from 'src/app/shared/services/product.service';
import { Product } from 'src/app/shared/models/product';
import {ToastrService} from "../../../shared/services/toastr.service";
import {Router} from "@angular/router";

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

  categories = ['samochody','żywność','narzędzia','rtv','inne'];
  selectedCategory = 'inne';

  constructor(private productService: ProductService,
              private toastrService: ToastrService,
              private router: Router) {}

  ngOnInit() {
    this.productForm = this.createFormGroup();
  }

  createFormGroup() {
    return new FormGroup({
      name: new FormControl('',[Validators.required,Validators.minLength(2)]),
      category: new FormControl('',[Validators.required]),
      price: new FormControl('',Validators.required),
      description: new FormControl('',Validators.required),
      imageUrl: new FormControl('',[Validators.required]),
      quantity: new FormControl('',[Validators.required,Validators.min(1)])
    });
  }

  createProduct() {
    var product = new Product();
    product.name = this.productForm.value['name'];
    product.category = this.selectedCategory;
    product.price = this.productForm.value['price'];
    product.description = this.productForm.value['description'];
    product.imageUrl =this.productForm.value['imageUrl'];
    product.quantity = this.productForm.value['quantity'];
    product.productAdded = moment().unix();
    product.bargain = 0;
    product.till = 0;
    this.productService.createProduct(product);
    this.router.navigateByUrl('/products/all-products');
  }

}
