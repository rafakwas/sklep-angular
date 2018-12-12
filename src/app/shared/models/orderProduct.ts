import {Product} from "./product";
export class OrderProduct {
  isChecked : boolean;
  product : Product;
  constructor(isChecked: boolean, product: Product) {
    this.isChecked = isChecked;
    this.product = product;
  }
}
