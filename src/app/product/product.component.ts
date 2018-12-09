import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Product} from "../model/product";
import {BasketService} from "../basket.service";
import {balancePreviousStylesIntoKeyframes} from "@angular/animations/browser/src/util";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input()
  product: Product;

  @Output()
  remove = new EventEmitter();

  constructor(private basketService : BasketService) {

  }

  ngOnInit() {
  }

  getBasketService() {
    return this.basketService;
  }

  clickRemove(product : Product) {
    this.remove.emit(product);
  }

}
