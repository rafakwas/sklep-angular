import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../shared/services/product.service";
import {CartService} from "../../shared/services/cart.service";
import {AuthService} from "../../shared/services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    public productService: ProductService,
    public cartService: CartService,
    public authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    console.log("navbar component init");
  }

  logout() {
    this.authService.signOut();
    this.router.navigate(["/"]);
  }

}
