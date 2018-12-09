import { Component, OnInit } from '@angular/core';
import {BasketService} from "../basket.service";
import {Basket} from "../model/basket";
import {Product} from "../model/product";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {


  constructor(private basketService: BasketService) { }

  ngOnInit() {
  }

}
