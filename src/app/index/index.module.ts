import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { IndexRoutes } from './index.routing';

import { ProductModule } from '../layouts/product/product.module';

import { IndexComponent } from './index.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import {LoginComponent} from "./login/login.component";
import {ReactiveFormsModule} from "@angular/forms";
import { MessageComponent } from './message/message.component';

@NgModule({
  imports: [ CommonModule, ProductModule,RouterModule.forChild(IndexRoutes), ReactiveFormsModule ],
  declarations: [ IndexComponent, NavbarComponent, FooterComponent, LoginComponent, MessageComponent ],
  schemas: [ NO_ERRORS_SCHEMA ],
  exports: [ NavbarComponent, FooterComponent, MessageComponent ],
  providers: []
})
export class IndexModule { }
