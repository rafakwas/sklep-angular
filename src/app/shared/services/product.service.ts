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

  getProducts(): Observable<Product[]> {
    return this.http
      .get<Product[]>("http://localhost:3000/products")
      .pipe(map(data => _.values(data)));
  }

  createProduct(product: Product) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    this.http.post<Product>('http://localhost:3000/products', product, httpOptions)
      .subscribe(p => this.toastrService.success("Produkt dodany!", ""));
  }

  updateProduct(product: Product) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    this.http.put<Product>('http://localhost:3000/products/' + product.id, product, httpOptions)
      .subscribe(p => this.toastrService.success("Produkt zaktualizowany!", ""));
  }

  decrementProductAmount(id: string, value: number) {
    this.getProducts().subscribe(p => {
      p.filter(x => x.id === id).forEach(product => {
        product.quantity -= value;
        this.updateProduct(product);
      });
    })
  }
}
