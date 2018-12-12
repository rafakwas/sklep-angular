import {Product} from "./product";
import {OrderProduct} from "./orderProduct";
const shortId = require('shortid');

export enum OrderStatus {
  AWAITING = "OCZEKUJĄCE",
  IN_PROGRESS = "W TRAKCIE",
  COMPLETED = "SKOMPLETOWANE"
}

export class Order {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  address: string;
  postalCode: string;
  city: string;
  phone: string;
  totalPrice: number;
  status: OrderStatus;
  sendDate: Date;
  products: OrderProduct[];

  constructor(firstname: string,
              lastname: string,
              email: string,
              address: string,
              postalCode: string,
              city: string,
              phone: string,
              totalPrice: number,
              products: OrderProduct[]
  ) {
    this.id = 'ORDER' + shortId.generate();
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.address = address;
    this.postalCode = postalCode;
    this.city = city;
    this.phone = phone;
    this.totalPrice = totalPrice;
    this.products = products;
    this.status = OrderStatus.AWAITING;
  }

}

