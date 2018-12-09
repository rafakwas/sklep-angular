import { ProductListComponent } from './product-list/product-list.component';
import { IndexComponent } from '../../index/index.component';
import { Routes } from '@angular/router';

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
			}
		]
	}
];
