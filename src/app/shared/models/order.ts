import {OrderProduct} from "./orderProduct";

export enum OrderStatus {
  AWAITING = "OCZEKUJĄCE",
  IN_PROGRESS = "W TRAKCIE",
  COMPLETED = "SKOMPLETOWANE"
}

export class Order {
  id: string;
  userId: string;
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

  constructor(userId: string,
              firstname: string,
              lastname: string,
              email: string,
              address: string,
              postalCode: string,
              city: string,
              phone: string,
              totalPrice: number,
              products: OrderProduct[]
  ) {
    this.userId = userId;
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

