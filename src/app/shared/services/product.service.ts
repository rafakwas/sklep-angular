import {Injectable, OnInit} from '@angular/core';
import {AngularFirestore, CollectionReference, Query, QueryFn} from 'angularfire2/firestore';
import {Observable} from 'rxjs';
import {Product} from "../models/product";

@Injectable({
  providedIn: "root"
})
export class ProductService implements OnInit {

  constructor(private db: AngularFirestore) { }

  ngOnInit() {
  }

  getProducts(): Observable<any[]> {
    const db = this.db.collection('/product');
    return db.valueChanges();
  }

  createProduct(product: Product) {
    this.db.collection('/product').doc(product.id).set(Object.assign({}, product))
      .then(function() {
        console.log('Product successfully added:', product);
      });
  }

  getProduct(id: string): Observable<any> {
    return this.db.collection('/product').doc(id).valueChanges();
  }
}
