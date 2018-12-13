import { Component, OnInit } from '@angular/core';
import { Product } from '../../../shared/models/product';
import { ProductService } from '../../../shared/services/product.service';
import { ToastrService } from 'src/app/shared/services/toastr.service';
import {Observable} from "rxjs";
import {CartService} from "../../../shared/services/cart.service";
import {AuthService} from "../../../shared/services/auth.service";
import {FormGroup, Validators, FormControl} from "@angular/forms";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  productList: Observable<Product[]>;

  categories = [ 'All', 'INNE' ];
  filterByCategory: 'All';
  filterByName: '';
  lowerPriceBound : number;
  upperPriceBound : number;
  page = 1;

  editForm : FormGroup;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private toastrService: ToastrService,
    public authService : AuthService,
  ) {}


  ngOnInit() {
    this.productList = this.productService.getProducts();
    this.editForm = this.createEditProductFormGroup();
  }

  createEditProductFormGroup() {
    return new FormGroup({
      quantity: new FormControl('',[Validators.required,Validators.min(1)])
    });
  }

  edit() {
    this.toastrService.info("edutujemy","jupi");
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  isProductAvailable(product : Product) {
    let cartProducts = this.cartService.getLocalCartProducts();
    for (var i = 0; i < cartProducts.length; i++) {
      if (cartProducts[i].id == product.id) {
        if (product.quantity <= cartProducts[i].quantity) {
          console.log("database product " + product.quantity + ". cart product " + cartProducts[i].quantity);
          return false;
        }
      }
    }
    return true;
  }

  getAuthService() {
    return this.authService;
  }

}
