import { ProductListComponent } from './product-list/product-list.component';
import { IndexComponent } from '../../index/index.component';
import { Routes } from '@angular/router';
import {AddProductComponent} from "./add-product/add-product.component";
import {ShoppingCartComponent} from "./shopping-cart/shopping-cart.component";
import {CheckoutComponent} from "./checkout/checkout.component";

export const ProductRoutes: Routes = [
	{
		path: 'products',
		children: [
			{
				path: '',
				component: IndexComponent
			},
			{
				path: 'all-products',
				component: ProductListComponent
			},
      {
        path: 'add-product',
        component: AddProductComponent
      },
      {
        path: 'shopping-cart',
        component: ShoppingCartComponent
      },
      {
        path: 'checkout',
        component: CheckoutComponent
      }
    ]
	}
];
