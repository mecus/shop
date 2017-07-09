import { NgModule } from "@angular/core";
import { MaterialModule } from "app/modules/material/material.module";
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CheckOutModule } from "app/container/check-out/check-out.module";
import * as products from './index';
import { CartModule } from './cart/cart.module';
import { CartService } from '../../services/cart.service';

@NgModule({
    declarations: [ 
        products.ProductViewComponent, 
        products.ProductComponent
    ],
    imports: [
        MaterialModule, BrowserModule, CartModule,
        BrowserAnimationsModule
        
    ],
    providers: [CartService],
    exports: []
})

export class ProductModule {}