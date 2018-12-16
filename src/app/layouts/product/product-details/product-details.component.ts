import { Component, OnInit } from '@angular/core';
import {Product} from "../../../shared/models/product";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ProductService} from "../../../shared/services/product.service";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  product : Product = new Product();

  constructor(private productService: ProductService,
              public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
