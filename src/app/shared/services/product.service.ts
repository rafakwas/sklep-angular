import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Product } from '../models/product';
import { ToastrService } from './toastr.service';

@Injectable()
export class ProductService {
  products: AngularFireList<Product>;
  product: AngularFireObject<Product>;

	navbarCartCount = 0;

	constructor(
    private db: AngularFireDatabase,
    private toastrService: ToastrService
  ) {
		this.calculateLocalCartProdCounts();
	}


  getProducts() {
    this.products = this.db.list('products');
    return this.products;
  }

  createProduct(data: Product) {
    console.log(data);
    console.log(this.products);
    this.products.push(data);
  }

  getProductById(key: string) {
    this.product = this.db.object('products/' + key);
    return this.product;
  }

  updateProduct(data: Product) {
    this.products.update(data.$key, data);
  }

  deleteProduct(key: string) {
    this.products.remove(key);
  }

  addToCart(data: Product): void {
    data.productQuatity=1;
    let a: Product[];
    a = JSON.parse(localStorage.getItem('avct_item')) || [];

    var found = false;
    for (let i = 0; i < a.length; i++) {
      if (a[i].productId === data.productId) {
        a[i].productQuatity++;
        found = true;
        break;
      }
    }

    if (!found) {
      a.push(data);
    }

		this.toastrService.wait('Adding Product to Cart', 'Product Adding to the cart');
    localStorage.setItem('avct_item', JSON.stringify(a));
    this.calculateLocalCartProdCounts();
	}

	removeLocalCartProduct(product: Product) {
		const products: Product[] = JSON.parse(localStorage.getItem('avct_item'));

		for (let i = 0; i < products.length; i++) {
			if (products[i].productId === product.productId) {
        if (products[i].productQuatity === 1) {
          products.splice(i, 1);
        } else {
          products[i].productQuatity--;
        }
				break;
			}
		}
		// ReAdding the products after remove
		localStorage.setItem('avct_item', JSON.stringify(products));

		this.calculateLocalCartProdCounts();
	}

	// Fetching Locat CartsProducts
	getLocalCartProducts(): Product[] {
		const products: Product[] = JSON.parse(localStorage.getItem('avct_item')) || [];

		return products;
	}

	// returning LocalCarts Product Count
	calculateLocalCartProdCounts() {
    var counter = 0;
    const products: Product[] = JSON.parse(localStorage.getItem('avct_item')) || [];
    products.forEach((product) => {
      counter += product.productQuatity;
    });
    this.navbarCartCount = counter;
	}
}
