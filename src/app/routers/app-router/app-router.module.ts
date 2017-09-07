import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';

import { HomeComponent } from '../../container/home/home.component';
import { CartComponent } from "../../container/products/cart/cart.component";
// import { BannerComponent } from "../../components/advert/banner.component";
import { LoginComponent } from '../../authentications/login/sign-in.component';
import { RegisterComponent } from '../../authentications/register/register.component';

import * as products from '../../container/products/index';
import { CheckoutComponent } from "../../container/check-out/checkout/checkout.component";
import { UpdateAccountComponent } from "../../container/check-out/update-account/update-account.component";
import { PaymentMethodComponent } from "../../container/check-out/payment-method/payment-method.component";
import { AccountSettingComponent } from "../../account/account-setting/account-setting.component";
import { DeliveryMethodComponent } from "../../container/check-out/deliverymethod/deliverymethod.component";
import { PaymentComponent } from "../../container/check-out/payment/payment.component";
import { OrderComponent } from "../../container/check-out/order/order.component";
import { OrdersComponent } from "../../account/orders/orders.component";
import { ResetPassword } from "../../components/reset-password/reset/reset-password.component";


const root:Route = {
  path: '',
    redirectTo: '/home', pathMatch: 'full'
}
const fallBack: Route = {
    path: '**', component: HomeComponent
}
const routes = [
  {path: '', component: HomeComponent},
  {path: 'products/?', component: products.ProductComponent},
  {path: 'login', component: LoginComponent },
  {path: 'register', component: RegisterComponent},
  {path: 'basket', component: CartComponent},
  {path: 'product', component:products.ProductViewComponent},
  {path: 'checkout', component:CheckoutComponent},
  {path: 'account_update', component: UpdateAccountComponent},
  {path: 'account/account_setting', component: AccountSettingComponent},
  {path: 'payment_method', component: PaymentMethodComponent},
  {path: 'delivery_method', component:DeliveryMethodComponent},
  {path: 'review_and_payment', component:PaymentComponent},
  {path: 'place_order', component:OrderComponent},
  {path: 'your_orders', component:OrdersComponent},
  {path: 'reset_password', component: ResetPassword},
  
  fallBack
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRouterModule { }
