import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';

import {RouterModule} from "@angular/router";
import { ProductRoutes } from "./product.routing";
import {SharedModule} from "../../shared/shared.module";
import { AddProductComponent } from './add-product/add-product.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import {FilterByCategory} from "./pipe/filterByCategory";
import {FilterByName} from "./pipe/filterByName";
import {LowerPriceBound} from "./pipe/LowerPriceBound";
import {UpperPriceBound} from "./pipe/UpperPriceBound";

@NgModule({
  imports: [CommonModule, RouterModule.forChild(ProductRoutes), SharedModule],
  declarations: [
    ProductListComponent,
    AddProductComponent,
    ShoppingCartComponent,
    FilterByCategory,
    FilterByName,
    LowerPriceBound,
    UpperPriceBound
  ],

})
export class ProductModule { }
