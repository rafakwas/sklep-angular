import { Component, OnInit } from '@angular/core';
import { Product } from '../../../shared/models/product';
import { ProductService } from '../../../shared/services/product.service';
import { ToastrService } from 'src/app/shared/services/toastr.service';
import {Observable} from "rxjs";
import {CartService} from "../../../shared/services/cart.service";
import {AuthService} from "../../../shared/services/auth.service";
import {FormGroup, Validators, FormControl} from "@angular/forms";
import {Router, ActivatedRoute} from "@angular/router";
declare var $: any;

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
    private router: Router,
    private route: ActivatedRoute
  ) {}


  ngOnInit() {
    this.productList = this.productService.getProducts();
    this.editForm = this.createEditProductFormGroup();
  }

  createEditProductFormGroup() {
    return new FormGroup({
      name: new FormControl('',[Validators.required,Validators.minLength(2)]),
      category: new FormControl('',[Validators.required,Validators.minLength(2)]),
      price: new FormControl('',Validators.required),
      description: new FormControl('',Validators.required),
      imageUrl: new FormControl('',[Validators.required]),
      quantity: new FormControl('',[Validators.required,Validators.min(1)])
    });
  }

  edit(product : Product) {
    product.name = this.editForm.value['name'];
    product.category = this.editForm.value['category'];
    product.price = this.editForm.value['price'];
    product.description = this.editForm.value['description'];
    product.imageUrl =this.editForm.value['imageUrl'];
    product.quantity = this.editForm.value['quantity'];

    this.productService.updateProduct(product);
    this.editForm = this.createEditProductFormGroup();

    setTimeout((router: Router) => {
      $("#editProduct").modal("hide");
      this.router.navigate(["/products/all-products"]);
    }, 500);
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  isProductAvailable(product : Product) {
    let cartProducts = this.cartService.getLocalCartProducts();
    if (cartProducts.length === 0 && product.quantity > 0) {
      return true;
    }
    if (cartProducts.length === 0 && product.quantity <= 0) {
      return false;
    }
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
