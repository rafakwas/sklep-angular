import {Injectable, OnInit} from '@angular/core';
import {AngularFirestore, CollectionReference, Query, QueryFn} from 'angularfire2/firestore';
import {Observable} from 'rxjs';
import {Product} from "../models/product";
import {CartService} from "./cart.service";
import {ToastrService} from "./toastr.service";
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import * as _ from 'lodash';
import {HttpHeaders} from "@angular/common/http";
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: "root"
})
export class ProductService implements OnInit {

  constructor(public db: AngularFirestore, private cartService: CartService, private toastrService: ToastrService,
              private http: HttpClient) {
  }

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

  decrementProductAmount(id : string, value : number) {
    this.db.collection('/product').doc(id).ref.get().then(p => {
      var product = p.data() as Product;
      product.quantity -= value;
      this.updateProduct(product);
    })
  }

  getProduct(id: string): any {
    return this.db.collection('/product').doc(id);
  }
}
