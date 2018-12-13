import { ProductListComponent } from './product-list/product-list.component';
import { IndexComponent } from '../../index/index.component';
import { Routes } from '@angular/router';
import {AddProductComponent} from "./add-product/add-product.component";
import {ShoppingCartComponent} from "./shopping-cart/shopping-cart.component";
import {CheckoutComponent} from "./checkout/checkout.component";
import {OrderListComponent} from "./order-list/order-list.component";
import {AdminGuard} from "../../shared/services/admin-gaurd";
import {UserOrdersComponent} from "./user-orders/user-orders.component";
import {OrderDetailsComponent} from "./order-details/order-details.component";

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
        component: AddProductComponent,
        // canActivate: AdminGuard
      },
      {
        path: 'shopping-cart',
        component: ShoppingCartComponent
      },
      {
        path: 'checkout',
        component: CheckoutComponent
      },
      {
        path: 'all-orders',
        component: OrderListComponent
      },
      {
        path: 'user-orders',
        component: UserOrdersComponent
      },
      {
        path: 'all-orders/:id',
        component: OrderDetailsComponent
      }
    ]
	}
];
