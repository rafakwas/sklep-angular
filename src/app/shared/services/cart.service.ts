import {Injectable, OnInit} from '@angular/core';
import {AngularFirestore, CollectionReference, Query, QueryFn} from 'angularfire2/firestore';
import {Observable} from 'rxjs';
import {Product} from "../models/product";

@Injectable({
  providedIn: "root"
})
export class CartService {

  getItemsCounter() {
    var counter = 0;
    const products: Product[] = JSON.parse(localStorage.getItem('basket')) || [];
    products.forEach((product) => {
      counter += product.quantity;
    });
    return counter;
  }

  addToCart(data: Product): void {
    var copiedProduct = Object.assign({},data);
    copiedProduct.quantity = 1;
    let a: Product[];
    a = JSON.parse(localStorage.getItem('basket')) || [];
    var found = false;
    for (let i = 0; i < a.length; i++) {
      if (a[i].id === data.id) {
        a[i].quantity++;
        found = true;
        break;
      }
    }
    if (!found) {
      a.push(copiedProduct);
    }
    localStorage.setItem('basket', JSON.stringify(a));
  }

  removeLocalCartProduct(product: Product) {
    const products: Product[] = JSON.parse(localStorage.getItem('basket'));
    for (let i = 0; i < products.length; i++) {
      if (products[i].id === product.id) {
        if (products[i].quantity === 1) {
          products.splice(i, 1);
        } else {
          products[i].quantity--;
        }
        break;
      }
    }
    localStorage.setItem('basket', JSON.stringify(products));
  }

  getLocalCartProducts(): Product[] {
    return JSON.parse(localStorage.getItem('basket')) || [];
  }

  freeLocalCart() {
    let a: Product[];
    a = [];
    localStorage.setItem('basket', JSON.stringify(a));
  }

  calculateCartProductsPrice() {
    let cartProducts = this.getLocalCartProducts();
    let totalPrice = 0;
    cartProducts.forEach((product) => {
      var priceReduction = 0;
      if (product.bargain != 0 && ((new Date().getTime()) < product.till)) {
        priceReduction = product.price*(product.bargain/100);
      }
      totalPrice += (product.price-priceReduction)*product.quantity;
    });
    return totalPrice;
  }

}
