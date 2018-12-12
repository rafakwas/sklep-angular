import {Product} from "./product";

export enum OrderStatus {
  AWAITING,
  IN_PROGRESS,
  COMPLETED
}

export class Order {
  $key: string;
  id : string;
  firstname: string;
  lastname: string;
  email: string;
  address: string;
  postalCode: string;
  city: string;
  phone: string;
  totalPrice: number;
  status : OrderStatus;
  sendDate : Date;
  products: Product[];
}

