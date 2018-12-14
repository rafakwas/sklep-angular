import {Injectable, OnInit} from '@angular/core';
import {AngularFirestore, CollectionReference, Query, QueryFn} from 'angularfire2/firestore';
import {Observable} from 'rxjs';
import {Product} from "../models/product";
import {CartService} from "./cart.service";
import {ToastrService} from "./toastr.service";

@Injectable({
  providedIn: "root"
})
export class ProductService implements OnInit {

  constructor(public db: AngularFirestore, private cartService : CartService, private toastrService : ToastrService) { }

  ngOnInit() {
  }

  getProducts(): Observable<any[]> {
    const db = this.db.collection('/product');
    return db.valueChanges();
  }

  createProduct(product: Product) {
    product.id = this.db.createId();
    this.db.collection('/product').doc(product.id).set(Object.assign({}, product))
      .then(function() {
        console.log('Product successfully added:', product);
      });
  }

  updateProduct(product : Product) {
    this.db.collection('/product').doc(product.id).set(Object.assign({}, product))
      .then(function() {
        console.log('Produkt zaktualizowany');
      });
  }

  getProduct(id: string): any {
    return this.db.collection('/product').doc(id);
  }

  isProductAvailable(product : Product) {
    let cartProducts = this.cartService.getLocalCartProducts();
    for (var i = 0; i < cartProducts.length; i++) {
      if (cartProducts[i].id == product.id) {
        if (product.quantity <= cartProducts[i].quantity) {
          console.log("database product " + product.quantity + ". cart product " + cartProducts[i].quantity);
          return false;
        }
      }
    }
    return true;
  }
}
