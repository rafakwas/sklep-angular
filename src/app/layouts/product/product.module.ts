import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductListComponent} from './product-list/product-list.component';

import {RouterModule} from "@angular/router";
import {ProductRoutes} from "./product.routing";
import {SharedModule} from "../../shared/shared.module";
import {AddProductComponent} from './add-product/add-product.component';
import {ShoppingCartComponent} from './shopping-cart/shopping-cart.component';
import {FilterByCategory} from "./pipe/filterByCategory";
import {FilterByName} from "./pipe/filterByName";
import {LowerPriceBound} from "./pipe/LowerPriceBound";
import {UpperPriceBound} from "./pipe/UpperPriceBound";
import {CheckoutComponent} from './checkout/checkout.component';
import {ReactiveFormsModule} from "@angular/forms";
import {OrderListComponent} from "./order-list/order-list.component";
import {UserOrdersComponent} from './user-orders/user-orders.component';
import {OrderDetailsComponent} from './order-details/order-details.component';
import {NgMultiSelectDropDownModule} from "ng-multiselect-dropdown";
import {PromotionComponent} from './promotion/promotion.component';
import {ProductComponent} from './product/product.component';
import {EditComponent} from './edit/edit.component';
import {NgbActiveModal, NgbModule} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  imports: [CommonModule,
    RouterModule.forChild(ProductRoutes),
    SharedModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgbModule
  ],
  declarations: [
    ProductListComponent,
    AddProductComponent,
    ShoppingCartComponent,
    FilterByCategory,
    FilterByName,
    LowerPriceBound,
    UpperPriceBound,
    CheckoutComponent,
    OrderListComponent,
    UserOrdersComponent,
    OrderDetailsComponent,
    PromotionComponent,
    ProductComponent,
    EditComponent
  ],
  providers: [NgbActiveModal],
  entryComponents: [
    EditComponent,
    ProductComponent,
    PromotionComponent]
})
export class ProductModule {
}

