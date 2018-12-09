import { Component, OnInit } from '@angular/core';
import {ProductService} from "../product.service";
import {Product} from "../model/product";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  productList = [];

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productList = this.productService.getProducts()
    console.log(this.productList.length)
  }

}
