import {Component, OnInit, OnChanges, SimpleChanges, SimpleChange, Input} from '@angular/core';
import {ProductService} from "../../../shared/services/product.service";
import {Product} from "../../../shared/models/product";
import * as _ from 'lodash';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  cartProducts: Product[];
  totalValue = 0;

  constructor(
    public productService : ProductService
  ) { }

  ngOnInit() {
    this.cartProducts = this.productService.getLocalCartProducts();
    this.recalculate();
  }

  removeCartProduct(product: Product) {
    this.productService.removeLocalCartProduct(product);
    this.cartProducts = this.productService.getLocalCartProducts();
    this.recalculate();
  }

  recalculate() {
    this.totalValue = 0;
    this.cartProducts.forEach((product) => {
      this.totalValue += product.productPrice*product.productQuatity;
    });
  }
}
