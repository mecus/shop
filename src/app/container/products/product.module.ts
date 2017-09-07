import { NgModule } from "@angular/core";
import { MaterialModule } from "../../modules/material/material.module";
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRouterModule } from '../../routers/app-router/app-router.module';
import { CheckOutModule } from "../check-out/check-out.module";
import * as products from './index';
import { CartService } from '../../services/cart.service';
import { ShippingDetailComponent } from '../../components/widget-components/shipping-detail/shipping-detail.component';
import { ReviewsComponent } from '../../components/reviews/reviews.component';

//Bootstrap Modules
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CarouselModule } from 'ngx-bootstrap/carousel';
// import { WidgetRightComponent } from '../../components/widget-right/widget-right.component';
// import { WidgetLeftComponent } from '../../components/widget-left/widget-left.component';
import { AppSharedModule } from "../../modules/shared-modules/app.shared.module";
import { CartComponent } from "./cart/cart.component";

@NgModule({
    declarations: [ 
        products.ProductViewComponent, 
        products.ProductComponent,
        ReviewsComponent, CartComponent
        
    ],
    imports: [
        MaterialModule, BrowserModule, AppRouterModule,
        BrowserAnimationsModule, FormsModule, ReactiveFormsModule,
        AppSharedModule,
        CarouselModule.forRoot()
        
    ],
    providers: [CartService],
    exports: []
})

export class ProductModule {}