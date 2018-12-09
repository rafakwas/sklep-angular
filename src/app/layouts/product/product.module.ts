import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';

import {RouterModule} from "@angular/router";
import { ProductRoutes } from "./product.routing";
import {SharedModule} from "../../shared/shared.module";
import { AddProductComponent } from './add-product/add-product.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(ProductRoutes), SharedModule],
  declarations: [
    ProductListComponent,
    AddProductComponent,
    ShoppingCartComponent,
  ],

})
export class ProductModule { }
