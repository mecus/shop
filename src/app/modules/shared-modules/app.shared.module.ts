import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WidgetRightComponent } from "app/components/widget-right/widget-right.component";
import { WidgetLeftComponent } from "app/components/widget-left/widget-left.component";
import { ShippingDetailComponent } from "app/components/widget-components/shipping-detail.component";
import { MaterialModule } from "app/modules/material/material.module";
import { SideCartComponent } from "app/container/products/cart/cart.side.component";
import { CartTotalComponent } from "app/container/products/cart/cart.total.component";
import { AppRouterModule } from "app/routers/app-router/app-router.module";
import { PrimaryNavigationComponent } from "app/container/menu/primary-navigation/primary-navigation.component";
import { SubMenuComponent } from "app/container/menu/top-menu/sub-menu";
import { TopMenuComponent } from "app/container/menu/top-menu/top-menu.component";
import { ProductSearchComponent } from "app/components/product-search/product-search.component";
import { HowToComponent } from "app/components/how-to/how-to.component";
import { NotifyComponent } from "app/authentications/notify/notify.component";
import { YoutubePipe } from "app/pipes/youtube.pipe";
import { SecondaryNavigationComponent } from '../../container/menu/secondary-navigation/secondary-navigation.component';
import { HoverMenuDirective } from "app/directives/hover-menu.directive";
import { SelectMenuDirective } from "app/directives/select-menu.directive";
import { FooterComponent } from "app/container/menu/footer/footer.component";
import { CardComponent } from '../../container/check-out/card/card.component';
import { AddressSearchComponent } from '../../container/check-out/address-search/address-search.component';
import { DeliveryOptionsComponent } from '../../container/check-out/delivery-options/delivery-options.component';
import { CheckoutCartComponent } from '../../container/check-out/checkout-cart/checkout-cart.component';

@NgModule({
    imports: [
        CommonModule, MaterialModule, BrowserAnimationsModule,
        AppRouterModule, FormsModule, ReactiveFormsModule, BsDropdownModule.forRoot()
    ],
    exports: [
        WidgetRightComponent, WidgetLeftComponent, 
        ShippingDetailComponent, SideCartComponent, 
        CartTotalComponent, PrimaryNavigationComponent,
        SubMenuComponent, TopMenuComponent, ProductSearchComponent,
        HowToComponent, NotifyComponent, YoutubePipe, SecondaryNavigationComponent,
        HoverMenuDirective, SelectMenuDirective, FooterComponent, CardComponent,
        AddressSearchComponent, DeliveryOptionsComponent, CheckoutCartComponent
    ],
    declarations: [
        WidgetRightComponent, WidgetLeftComponent,
        ShippingDetailComponent, SideCartComponent, 
        CartTotalComponent, PrimaryNavigationComponent,
        SubMenuComponent, TopMenuComponent, ProductSearchComponent,
        HowToComponent, NotifyComponent, YoutubePipe, SecondaryNavigationComponent,
        HoverMenuDirective, SelectMenuDirective, FooterComponent, CardComponent,
        AddressSearchComponent, DeliveryOptionsComponent, CheckoutCartComponent
        
    ]
})

export class AppSharedModule {}