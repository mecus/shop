import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { MaterialModule } from "app/modules/material/material.module";
import { CheckoutComponent } from './checkout/checkout.component';
import { AppSharedModule } from "app/modules/shared-modules/app.shared.module";
import { BillingInfoComponent } from "app/container/check-out/billinginformation/billinginfo.component";
import { GuestCheckoutComponent } from "app/container/check-out/guestcheckout/guestcheckout.component";
import { UpdateAccountComponent } from './update-account/update-account.component';
import { ProgressComponent } from './progress/progress.component';
import { PaymentMethodComponent } from './payment-method/payment-method.component';
import { PaymentService } from "app/services/payment.service";
import { DeliveryMethodComponent } from "app/container/check-out/deliverymethod/deliverymethod.component";
import { TempOrderService } from "app/services/temp-order.service";
import { PaymentComponent } from './payment/payment.component';
import { AppRouterModule } from "app/routers/app-router/app-router.module";
import { OrderService } from "app/services/order.service";
import { PaypalComponent } from './paypal/paypal.component';
import { OrderComponent } from './order/order.component';



@NgModule({
  imports: [
    CommonModule, MaterialModule, AppSharedModule, BrowserAnimationsModule,
    FormsModule, ReactiveFormsModule, AppRouterModule
  ],
  declarations: [
    CheckoutComponent, BillingInfoComponent, DeliveryMethodComponent,
    GuestCheckoutComponent, UpdateAccountComponent, ProgressComponent, PaymentMethodComponent, 
    PaymentComponent, PaypalComponent, OrderComponent
  ],
  exports: [],
  providers: [PaymentService, TempOrderService, OrderService]

})
export class CheckOutModule {}
