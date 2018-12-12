import {Component, OnInit, OnChanges, SimpleChanges, SimpleChange, Input} from '@angular/core';
import {ProductService} from "../../../shared/services/product.service";
import {Product} from "../../../shared/models/product";
import * as _ from 'lodash';
import {CartService} from "../../../shared/services/cart.service";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  cartProducts: Product[];
  totalValue = 0;

  constructor(
    public productService : ProductService,
    private cartService : CartService
  ) { }

  ngOnInit() {
    this.cartProducts = this.cartService.getLocalCartProducts();
    this.recalculate();
  }

  removeCartProduct(product: Product) {
    this.cartService.removeLocalCartProduct(product);
    this.cartProducts = this.cartService.getLocalCartProducts();
    this.recalculate();
  }

  recalculate() {
    this.totalValue = this.cartService.getLocalCartProductsTotalValue()
  }
}
