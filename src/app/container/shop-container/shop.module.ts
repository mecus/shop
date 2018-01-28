import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HelpComponent } from './help/help.component';
import { AppSharedModule } from "../../share-modules/app.shared.module";
import { MaterialModule } from "../../share-modules/material/material.module";
import { TermsComponent } from './terms/terms.component';
import { CookiePrivacyComponent } from './cookie-privacy/cookie-privacy.component';
import { SiteMapComponent } from './site-map/site-map.component';
// import { ShopService } from '../../services/shop.service';
import { VideoInstructionComponent } from './video-instruction/video-instruction.component';
import { NgeCarouselModule } from '../../share-modules/carousel-module/nge-carousel.module';
import * as products from '../products/index';
import { CartComponent } from '../products/cart/cart.component';
import { ProductOfferComponent } from '../products/product-offer/product-offer.component';
import { BrandProductComponent } from '../products/brands/brand-product.component';
import { ShopRouterModule } from './shop.router.module';
import { PostcodeModule } from '../../share-modules/postcode-module/postcode.module';
import { ShopOutletComponent } from '../../router-outlets/shop-outlet.component';
// import { CartService } from '../../services/cart.service';
import { NgxPaginationModule } from 'ngx-pagination';
// import { AuthenticationsModule } from '../../authentications/authentications.module';
import { ProductComponent } from '../../container/products/product/product.component';
import { ProductViewComponent } from '../../container/products/product/product-view.component';
import { ReviewsComponent } from '../../components/reviews/reviews.component';
import * as mob from "../mobile/mobile-index";
import { WidgetRightComponent } from "../../components/widget-right/widget-right.component";
import { WidgetLeftComponent } from "../../components/widget-left/widget-left.component";
import { ShippingDetailComponent } from "../../components/widget-components/shipping-detail/shipping-detail.component";
import { SideCartComponent } from "../products/cart/cart.side.component";
import { SponsorProductComponent } from '../../components/widget-components/sponsor-product/sponsor-product.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { shopReducer } from '../../store-management/reducers/shop.reducer';
import { CartReducer } from '../../store-management/reducers/cart.reducer';


@NgModule({
  imports: [
    StoreModule.forFeature('shop', shopReducer),
    StoreModule.forFeature('cart', CartReducer),
    CommonModule, AppSharedModule, MaterialModule,
    FormsModule, ReactiveFormsModule, NgxPaginationModule, ShopRouterModule,
    NgeCarouselModule, PostcodeModule,
  
  ],

  declarations: [
    ShopOutletComponent, ReviewsComponent,
    HelpComponent, TermsComponent, CookiePrivacyComponent,
    SiteMapComponent, VideoInstructionComponent,
    ProductViewComponent,
    ProductComponent,
    CartComponent,
    ProductOfferComponent, BrandProductComponent,
    mob.CategoryListComponent,
    mob.HomeLinkComponent,
    mob.MobileProductComponent,
    mob.ProductSearchComponent,
    mob.ProductViewComponent,
    mob.AisleListComponent,
    WidgetRightComponent,
    WidgetLeftComponent,
    ShippingDetailComponent,
    SideCartComponent,
    SponsorProductComponent
  ],
  providers: []
  
})
export class ShopModule { }
