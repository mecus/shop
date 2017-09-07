import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { MaterialModule } from "../../modules/material/material.module";
import { CheckoutComponent } from './checkout/checkout.component';
import { AppSharedModule } from "../../modules/shared-modules/app.shared.module";
import { BillingInfoComponent } from "./billinginformation/billinginfo.component";
import { GuestCheckoutComponent } from "./guestcheckout/guestcheckout.component";
import { UpdateAccountComponent } from './update-account/update-account.component';
import { ProgressComponent } from './progress/progress.component';
import { PaymentMethodComponent } from './payment-method/payment-method.component';
import { PaymentService } from "../../services/payment.service";
import { DeliveryMethodComponent } from "./deliverymethod/deliverymethod.component";
import { TempOrderService } from "../../services/temp-order.service";
import { PaymentComponent } from './payment/payment.component';
import { AppRouterModule } from "../../routers/app-router/app-router.module";
import { OrderService } from "../../services/order.service";
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
