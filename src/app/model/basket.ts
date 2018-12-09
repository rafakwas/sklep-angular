import {Product} from "./product";
import * as Collections from 'typescript-collections';
import Dictionary = Collections.Dictionary;
export class Basket {
  totalProducts: number;
  totalPrice: number;
  products: Dictionary<Product,number>;
  constructor(totalProducts: number, totalPrice: number, products : Dictionary<Product,number>) {
    this.totalProducts = totalProducts;
    this.totalPrice = totalPrice;
    this.products = products;

  }
}
