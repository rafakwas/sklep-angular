import {Component, OnInit} from "@angular/core";
import {Product} from "../../../shared/models/product";
import {FormGroup, Validators, FormControl} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ProductService} from "../../../shared/services/product.service";

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.scss']
})
export class PromotionComponent implements OnInit {

  product : Product = new Product();
  promotionForm: FormGroup;

  constructor(private productService: ProductService,
              public activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.promotionForm = PromotionComponent.createDefinePromotionFormGroup();
  }

  static createDefinePromotionFormGroup() {
    return new FormGroup({
      bargain: new FormControl('', [Validators.required, Validators.min(1), Validators.max(99)]),
      promotionTime: new FormControl('', [Validators.required, Validators.min(3), Validators.max(4320)])
    });
  }

  addPromotion() {
    var xMinutesLater = new Date();
    xMinutesLater.setMinutes(xMinutesLater.getMinutes() + this.promotionForm.value['promotionTime']);
    this.product.bargain = this.promotionForm.value['bargain'];
    this.product.till = xMinutesLater.getTime();
    this.productService.updateProduct(this.product);
    this.activeModal.close();
  }

  deletePromotion() {
    this.product.bargain = 0;
    this.product.till = 0;
    this.productService.updateProduct(this.product);
    this.activeModal.close();
  }


}
