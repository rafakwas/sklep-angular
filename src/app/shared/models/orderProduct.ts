import {Product} from "./product";
export class OrderProduct {
  id : string;
  isChecked : boolean;
  product : Product;
  constructor(id : string, isChecked: boolean, product: Product) {
    this.id = id;
    this.isChecked = isChecked;
    this.product = product;
  }
}
