import {Component, OnInit} from "@angular/core";
import {FormGroup, Validators, FormControl} from "@angular/forms";
import {Product} from "../../../shared/models/product";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ProductService} from "../../../shared/services/product.service";
declare var $: any;

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  editForm: FormGroup;
  product : Product = new Product();

  constructor(private productService: ProductService,
              public activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.editForm = EditComponent.createEditProductFormGroup();
  }

  static createEditProductFormGroup() {
    return new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      category: new FormControl('', [Validators.required, Validators.minLength(2)]),
      price: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      imageUrl: new FormControl('', [Validators.required]),
      quantity: new FormControl('', [Validators.required, Validators.min(1)])
    });
  }

  edit() {
    this.product.name = this.editForm.value['name'];
    this.product.category = this.editForm.value['category'];
    this.product.price = this.editForm.value['price'];
    this.product.description = this.editForm.value['description'];
    this.product.imageUrl = this.editForm.value['imageUrl'];
    this.product.quantity = this.editForm.value['quantity'];

    this.productService.updateProduct(this.product);
    this.editForm = EditComponent.createEditProductFormGroup();

    this.activeModal.close();

  }

}
