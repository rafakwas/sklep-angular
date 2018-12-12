import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MDBBootstrapModule } from "angular-bootstrap-md";
import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AngularFireAuthModule } from "angularfire2/auth";
import { FormsModule, FormBuilder } from "@angular/forms";
import { RouterModule, Router } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { AgmCoreModule } from "@agm/core";
import { NoProductsFoundComponent } from "./components/no-products-found/no-products-found.component";
import { NoAccessComponent } from "./components/no-access/no-access.component";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";

import { ProductService } from "./services/product.service";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { ScrollingModule } from "@angular/cdk/scrolling";
import { CdkTableModule } from "@angular/cdk/table";
import { CdkTreeModule } from "@angular/cdk/tree";
import {FirebaseConfig} from "../../environments/firebase";
import {NgxPaginationModule} from 'ngx-pagination';
import {OrderService} from "./services/order.service"; // <-- import the module

@NgModule({
	imports: [
		CommonModule,
		MDBBootstrapModule.forRoot(),
		AngularFireModule.initializeApp(FirebaseConfig),
		AngularFireDatabaseModule,
		AngularFireAuthModule,
		FormsModule,
		HttpClientModule,
		RouterModule,
    NgxPaginationModule
  ],
	declarations: [
		NoProductsFoundComponent,
		NoAccessComponent,
		PageNotFoundComponent,
	],
	exports: [
    NgxPaginationModule,
		NoProductsFoundComponent,
		FormsModule,
		MDBBootstrapModule,
		AngularFireModule,
		AngularFireAuthModule,
		AngularFireDatabaseModule,
		FormsModule,
		RouterModule,
		AgmCoreModule,
		NoAccessComponent,
		PageNotFoundComponent,
		CdkTableModule,
		CdkTreeModule,
		DragDropModule, ScrollingModule
	],
	providers: [ProductService, OrderService, FormBuilder]
})
export class SharedModule { }
