import { NgModule } from "@angular/core";
import { MaterialModule } from "app/modules/material/material.module";
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckOutModule } from "app/container/check-out/check-out.module";
import * as products from './index';
import { CartModule } from './cart/cart.module';
import { CartService } from '../../services/cart.service';
import { SideAdComponent } from '../../components/side-ad/side-ad.component';
import { ReviewsComponent } from '../../components/reviews/reviews.component';

@NgModule({
    declarations: [ 
        products.ProductViewComponent, 
        products.ProductComponent, SideAdComponent,
        ReviewsComponent
    ],
    imports: [
        MaterialModule, BrowserModule, CartModule,
        BrowserAnimationsModule, FormsModule, ReactiveFormsModule
        
    ],
    providers: [CartService],
    exports: []
})

export class ProductModule {}