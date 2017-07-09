import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from "app/modules/material/material.module";
import { CartComponent } from './cart.component';
import { SideCartComponent } from './cart.side.component';
import { CartTotalComponent } from "./cart.total.component";


@NgModule({
  imports: [
    CommonModule, MaterialModule
  ],
  declarations: [CartComponent, SideCartComponent, CartTotalComponent],
  exports: [CartComponent, SideCartComponent, CartTotalComponent],
  providers: []

})
export class CartModule { }
