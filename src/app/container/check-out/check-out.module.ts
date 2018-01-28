import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { MaterialModule } from "../../share-modules/material/material.module";
import { CheckoutComponent } from './checkout/checkout.component';
import { AppSharedModule } from "../../share-modules/app.shared.module";
import { BillingInfoComponent } from "./billinginformation/billinginfo.component";
import { GuestCheckoutComponent } from "./guestcheckout/guestcheckout.component";
import { UpdateAccountComponent } from './update-account/update-account.component';
import { ProgressComponent } from './progress/progress.component';
import { PaymentMethodComponent } from './payment-method/payment-method.component';
import { PaymentService } from "../../services/payment.service";
import { DeliveryMethodComponent } from "./deliverymethod/deliverymethod.component";
import { TempOrderService } from "../../services/temp-order.service";
import { PaymentComponent } from './payment/payment.component';
// import { AppRouterModule } from "../../routers/app-router.module";
import { OrderService } from "../../services/order.service";
// import { PaypalComponent } from './paypal/paypal.component';
import { OrderComponent } from './order/order.component';
import { ProgressService } from '../../services/checkout-progress.service';
import { LoadSpinnerModule } from '../../share-modules/spinner-module/load-spinner.module';
import { CheckOutRouterModule } from './check-out.router.module';
import { CheckOutletComponent } from '../../router-outlets/check-outlet.component';
import { DeliveryOptionsComponent } from './delivery-options/delivery-options.component';
import { CheckoutCartComponent } from './checkout-cart/checkout-cart.component';
import { PaypalComponent } from './paypal/paypal.component';
import { CardComponent } from './card/card.component';


@NgModule({
  imports: [
    CommonModule, MaterialModule, AppSharedModule, BrowserAnimationsModule,
    FormsModule, ReactiveFormsModule, CheckOutRouterModule, LoadSpinnerModule
  ],
  declarations: [
    CheckOutletComponent, CardComponent,
    CheckoutComponent, BillingInfoComponent, DeliveryMethodComponent,
    GuestCheckoutComponent, UpdateAccountComponent, ProgressComponent, PaymentMethodComponent, 
    PaymentComponent, OrderComponent, CheckoutCartComponent,
    DeliveryOptionsComponent, PaypalComponent
  ],
  exports: [],
  providers: [PaymentService, TempOrderService, OrderService, ProgressService]

})
export class CheckOutModule {}
