import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { MaterialModule } from "app/modules/material/material.module";
import { CheckoutComponent } from './checkout/checkout.component';
import { AppSharedModule } from "app/modules/shared-modules/app.shared.module";
import { BillingInfoComponent } from "app/container/check-out/billinginformation/billinginfo.component";
import { GuestCheckoutComponent } from "app/container/check-out/guestcheckout/guestcheckout.component";
import { CheckoutService } from "app/services/checkout.service";
import { UpdateAccountComponent } from './update-account/update-account.component';
import { ProgressComponent } from './progress/progress.component';



@NgModule({
  imports: [
    CommonModule, MaterialModule, AppSharedModule, BrowserAnimationsModule,
    FormsModule, ReactiveFormsModule
  ],
  declarations: [
    CheckoutComponent, BillingInfoComponent, 
    GuestCheckoutComponent, UpdateAccountComponent, ProgressComponent
  ],
  exports: [],
  providers: [CheckoutService]

})
export class CheckOutModule {}
