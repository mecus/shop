import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';

import { CheckoutComponent } from "./checkout/checkout.component";
import { UpdateAccountComponent } from "./update-account/update-account.component";
import { PaymentMethodComponent } from "./payment-method/payment-method.component";
import { DeliveryMethodComponent } from "./deliverymethod/deliverymethod.component";
import { PaymentComponent } from "./payment/payment.component";
import { OrderComponent } from "./order/order.component";
import { CheckOutletComponent } from '../../router-outlets/check-outlet.component';

// import { ProductSearchComponent } from "./mobile-index";

// const root:Route = {
//   path: '',
//     redirectTo: '/home', pathMatch: 'full'
// }
// const fallBack: Route = {
//     path: '**', component: HomeComponent
// }
const routes = [
  {path: 'check', component: CheckOutletComponent,
    children: [
      {path: 'checkout', component:CheckoutComponent},
      {path: 'account_update', component: UpdateAccountComponent},
      {path: 'payment_method', component: PaymentMethodComponent},
      {path: 'delivery_method', component:DeliveryMethodComponent},
      {path: 'review_and_payment', component:PaymentComponent},
      {path: 'place_order', component:OrderComponent},
  ]}

]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class CheckOutRouterModule { }
