import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WidgetRightComponent } from "../../components/widget-right/widget-right.component";
import { WidgetLeftComponent } from "../../components/widget-left/widget-left.component";
import { ShippingDetailComponent } from "../../components/widget-components/shipping-detail/shipping-detail.component";
import { MaterialModule } from "../material/material.module";
import { SideCartComponent } from "../../container/products/cart/cart.side.component";
import { CartTotalComponent } from "../../container/products/cart/cart.total.component";
import { AppRouterModule } from "../../routers/app-router/app-router.module";
import { PrimaryNavigationComponent } from "../../container/menu/primary-navigation/primary-navigation.component";
import { SubMenuComponent } from "../../container/menu/top-menu/sub-menu";
import { TopMenuComponent } from "../../container/menu/top-menu/top-menu.component";
import { ProductSearchComponent } from "../../components/product-search/product-search.component";
import { HowToComponent } from "../../components/how-to/how-to.component";
import { NotifyComponent } from "../../authentications/notify/notify.component";
import { YoutubePipe } from "../../pipes/youtube.pipe";
import { SecondaryNavigationComponent } from '../../container/menu/secondary-navigation/secondary-navigation.component';
import { HoverMenuDirective } from "../../directives/hover-menu.directive";
import { SelectMenuDirective } from "../../directives/select-menu.directive";
import { FooterComponent } from "../../container/menu/footer/footer.component";
import { CardComponent } from '../../container/check-out/card/card.component';
import { AddressSearchComponent } from '../../container/check-out/address-search/address-search.component';
import { DeliveryOptionsComponent } from '../../container/check-out/delivery-options/delivery-options.component';
import { CheckoutCartComponent } from '../../container/check-out/checkout-cart/checkout-cart.component';
import { ForgorttenPassword } from "../../components/reset-password/forgotten/forgotten-password";
import { ChangePassword } from "../../components/reset-password/change/change-password";
import { CheckOutMenuComponent } from '../../container/menu/check-out-menu/check-out-menu.component';

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
        AddressSearchComponent, DeliveryOptionsComponent, CheckoutCartComponent,
        ForgorttenPassword, ChangePassword, CheckOutMenuComponent
    ],
    declarations: [
        WidgetRightComponent, WidgetLeftComponent,
        ShippingDetailComponent, SideCartComponent, 
        CartTotalComponent, PrimaryNavigationComponent,
        SubMenuComponent, TopMenuComponent, ProductSearchComponent,
        HowToComponent, NotifyComponent, YoutubePipe, SecondaryNavigationComponent,
        HoverMenuDirective, SelectMenuDirective, FooterComponent, CardComponent,
        AddressSearchComponent, DeliveryOptionsComponent, CheckoutCartComponent,
        ForgorttenPassword, ChangePassword, CheckOutMenuComponent
        
    ]
})

export class AppSharedModule {}