import {Injectable} from '@angular/core';
import {Product} from "./model/product";
import {Basket} from "./model/basket";
import * as Collections from 'typescript-collections';
import Dictionary = Collections.Dictionary;

@Injectable({
  providedIn: 'root'
})

export class BasketService {

  constructor() {
  }

  add_product(product: Product) {
    var basket = this.get_basket();
    if (basket.products.containsKey(product)) {
      basket.products.setValue(product,basket.products.getValue(product)+1);
    } else {
      basket.products.setValue(product,1);
    }
    localStorage.setItem("basket", JSON.stringify(basket))
  }

  get_basket() {
    let basket = localStorage.getItem("basket");
    if (basket) {
      return JSON.parse(basket);
    } else {
      var result = (new Basket(0, 0, new Dictionary<Product,number>()));
      localStorage.setItem("basket", JSON.stringify(result));
      return result;
    }
  }

  reduce_product_counter(product: Product) {
    console.log("reduce")
    var basket = this.get_basket();
    var products = basket.products;
    for (const item of products) {
      console.log("reduce")
      if (item.id === product.id) {
        item.count--;
        console.log(item.count);
        if (item.count === 0) {
          let indexOf = products.indexOf(product);
          console.log(indexOf);
          products.splice(indexOf);
        }
        basket.totalPrice = basket.totalPrice - item.price;
        basket.totalProducts--;
      }
    }
    localStorage.setItem("basket", JSON.stringify(basket))
  }

  remove_product(product: Product) {
    console.log("remove")
    var basket = this.get_basket();
    var products = basket.products;
    for (var i=0; i<products.length; i++) {
      console.log(products.length)
      if (basket.products[i].id === product.id) {
        var count = basket.products[i].count;
        var price = basket.products[i].price;
        products.splice(i);
        basket.totalProducts = basket.totalProducts - count;
        basket.totalPrice = basket.totalPrice - count * price;
      }
    }
    localStorage.setItem("basket", JSON.stringify(basket))
  }
}
