import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from "app/modules/material/material.module";
import { AppRouterModule } from '../../../routers/app-router/app-router.module';
import { CartComponent } from './cart.component';
import { SideCartComponent } from './cart.side.component';
import { CartTotalComponent } from "./cart.total.component";
import { AppSharedModule } from "app/modules/shared-modules/app.shared.module";


@NgModule({
  imports: [
    CommonModule, MaterialModule, AppRouterModule
  ],
  declarations: [],
  exports: [],
  providers: []

})
export class CartModule { }
