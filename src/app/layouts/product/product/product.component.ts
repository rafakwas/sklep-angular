import {Component, OnInit, Input} from "@angular/core";
import {Product} from "../../../shared/models/product";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AuthService} from "../../../shared/services/auth.service";
import {CartService} from "../../../shared/services/cart.service";
import {PromotionComponent} from "../promotion/promotion.component";
import {EditComponent} from "../edit/edit.component";
import {ProductDetailsComponent} from "../product-details/product-details.component";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input() product: Product;

  constructor(private cartService: CartService,
              private authService: AuthService,
              private modalService: NgbModal) { }

  ngOnInit() {
  }

  openPromotionModal() {
    const modalRef = this.modalService.open(PromotionComponent);
    modalRef.componentInstance.product = this.product;
    console.log(modalRef.componentInstance.product.id);
    console.log(modalRef.componentInstance.product.id);
  }

  openDetailsModal() {
    const modalRef = this.modalService.open(ProductDetailsComponent);
    modalRef.componentInstance.product = this.product;
  }

  openEditModal() {
    const modalRef = this.modalService.open(EditComponent);
    modalRef.componentInstance.product = this.product;
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  isPromotionAvailable() {
    return this.product.bargain > 0 && this.product.till && ((new Date().getTime()) < this.product.till);
  }

  isProductAvailable(product: Product) {
    let cartProducts = this.cartService.getLocalCartProducts();
    var cartProductQuantity = 0;
    cartProducts.filter(cp => cp.id === product.id).forEach(cp => cartProductQuantity = cp.quantity);
    let leftQuantity = product.quantity-cartProductQuantity;
    return leftQuantity > 0;
  }

  getAuthService() {
    return this.authService;
  }

}
