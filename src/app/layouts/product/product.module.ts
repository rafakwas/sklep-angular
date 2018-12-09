import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';

import {RouterModule} from "@angular/router";
import { ProductRoutes } from "./product.routing";

@NgModule({
  imports: [CommonModule, RouterModule.forChild(ProductRoutes)],
  declarations: [
    ProductListComponent,
  ],

})
export class ProductModule { }
