import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../shared/services/product.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    public productService: ProductService,
  ) { }

  ngOnInit() {
  }

}
