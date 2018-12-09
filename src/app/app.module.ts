import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA, APP_INITIALIZER } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { IndexModule } from './index/index.module';
import { ProductModule } from './layouts/product/product.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { RouterModule } from '@angular/router';
import {SharedModule} from "./shared/shared.module";
import { AppRoutes } from './app.routing';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IndexModule,
    ProductModule,
    SharedModule,
    RouterModule.forRoot(AppRoutes),
    MDBBootstrapModule.forRoot()
  ],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
