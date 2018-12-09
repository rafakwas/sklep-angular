import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../../shared/services/product.service";
import {Product} from "../../../shared/models/product";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  cartProducts: Product[];

  constructor(
    public productService : ProductService
  ) { }

  ngOnInit() {
    this.cartProducts = this.productService.getLocalCartProducts();
  }

  removeCartProduct(product: Product) {
    this.productService.removeLocalCartProduct(product);
    this.cartProducts = this.productService.getLocalCartProducts();
  }

}
