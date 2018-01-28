import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { ShopOutletComponent } from '../../router-outlets/shop-outlet.component';
import { CartComponent } from "../products/cart/cart.component";
// import { BannerComponent } from "../../components/advert/banner.component";

import * as products from '../products/index';
// import { CheckoutComponent } from "../container/check-out/checkout/checkout.component";
// import { UpdateAccountComponent } from "../container/check-out/update-account/update-account.component";
// import { PaymentMethodComponent } from "../container/check-out/payment-method/payment-method.component";
// import { AccountSettingComponent } from "../account/account-setting/account-setting.component";
// import { DeliveryMethodComponent } from "../container/check-out/deliverymethod/deliverymethod.component";
// import { PaymentComponent } from "../container/check-out/payment/payment.component";
// import { OrderComponent } from "../container/check-out/order/order.component";
// import { OrdersComponent } from "../account/orders/orders.component";
import { ResetPassword } from "../../authentications/reset-password/reset/reset-password.component";
import { HelpComponent } from "./help/help.component";
import { TermsComponent } from './terms/terms.component';
import { CookiePrivacyComponent } from './cookie-privacy/cookie-privacy.component';
import { SiteMapComponent } from './site-map/site-map.component';

import { VideoInstructionComponent } from './video-instruction/video-instruction.component';
import { ProductOfferComponent } from '../products/product-offer/product-offer.component';
import { BrandProductComponent } from '../products/brands/brand-product.component';
import { ProductSearchComponent, MobileProductComponent, 
    CategoryListComponent, ProductViewComponent, AisleListComponent 
} from '../mobile/mobile-index';
import { ProductComponent } from '../products/product/product.component';

// import { ProductSearchComponent } from "./mobile-index";

// const root:Route = {
//   path: '',
//     redirectTo: '/home', pathMatch: 'full'
// }
// const fallBack: Route = {
//     path: '**', component: HomeComponent
// }
const routes = [
  // {path: 'shop', loadChildren: '../container/shop-container/shop.module#ShopModule'},
    
      {path: 'shop', component: ShopOutletComponent,
        children: [
          {path: 'products/:name', component: ProductComponent},
          {path: 'mob_category/:id', component: MobileProductComponent},
          {path: 'mob_department/:id', component: AisleListComponent},
          {path: 'mob_aisle/:id', component: CategoryListComponent },
          {path: 'basket', component: CartComponent},
          {path: 'product/:name', component:products.ProductViewComponent},
          {path: 'reset_password', component: ResetPassword},
          {path: 'get_help', component: HelpComponent},
          {path: 'terms_conditions', component: TermsComponent},
          {path: 'cookie_privacy', component: CookiePrivacyComponent},
          {path: 'site_map', component: SiteMapComponent},
          {path: 'instruction_video', component: VideoInstructionComponent},
          {path: 'offer/products', component: ProductOfferComponent},
          {path: 'products/brands', component: BrandProductComponent},
          {path: 'mobile_product_search', component: ProductSearchComponent},

          {path: 'product_view/?', component: ProductViewComponent},  
      ]}

]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ShopRouterModule { }
