import { Component, OnInit } from '@angular/core';
import { Product } from '../../../shared/models/product';
import { ProductService } from '../../../shared/services/product.service';
import { ToastrService } from 'src/app/shared/services/toastr.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  productList: Product[];

  constructor(
    private productService: ProductService,
    private toastrService: ToastrService
  ) {}

  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts() {
    const x = this.productService.getProducts();
    x.snapshotChanges().subscribe(
      (product) => {
        this.productList = [];
        this.toastrService.info('Fetching data', '');
        product.forEach((element) => {
          const y = element.payload.toJSON();
          y['$key'] = element.key;
          this.productList.push(y as Product);
        });
      },
      (err) => {
        this.toastrService.error('Error while fetching Products', err);
      }
    );
  }

  removeProduct(key: string) {
    this.productService.deleteProduct(key);
  }

  addToCart(product: Product) {
    this.productService.addToCart(product);
  }


}
