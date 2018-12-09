import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';

import {RouterModule} from "@angular/router";
import { ProductRoutes } from "./product.routing";
import {SharedModule} from "../../shared/shared.module";
import { AddProductComponent } from './add-product/add-product.component';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(ProductRoutes), SharedModule],
  declarations: [
    ProductListComponent,
    AddProductComponent,
  ],

})
export class ProductModule { }
