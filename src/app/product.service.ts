import { Injectable } from '@angular/core';
import { ProductList } from './model/mockProduct'

@Injectable({
  providedIn: 'root'
})
export class ProductService {



  constructor() { }

  getProducts() {
  return ProductList
}
}
