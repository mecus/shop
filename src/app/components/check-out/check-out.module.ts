import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from "app/modules/material/material.module";
import { CartComponent } from './cart.component';
import { SideCartComponent } from './cart.side.component';

@NgModule({
  imports: [
    CommonModule, MaterialModule
  ],
  declarations: [CartComponent, SideCartComponent],
  exports: [CartComponent, SideCartComponent]

})
export class CheckOutModule { }
