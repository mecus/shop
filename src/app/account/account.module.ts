import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../share-modules/material/material.module';
import { AccountSettingComponent } from './account-setting/account-setting.component';
import { AppSharedModule } from "../share-modules/app.shared.module";
import { AccountInfoEditComponent } from './components/account-info-edit/account-info-edit.component';
import { AccountAddressEditComponent } from './components/account-address-edit/account-address-edit.component';
import { OrdersComponent } from './orders/orders.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { DeliveryEditComponent } from './components/delivery-address-edit/delivery-address.component';
import { AccountRouterModule } from './account.router.module';
import { AccountOutletComponent } from '../router-outlets/account-outlet.component';

@NgModule({
  imports: [
    CommonModule, MaterialModule, AccountRouterModule,
    AppSharedModule, FormsModule, ReactiveFormsModule
  ],
  declarations: [
    AccountOutletComponent,
    AccountSettingComponent, AccountInfoEditComponent, DeliveryEditComponent,
    AccountAddressEditComponent, OrdersComponent, ShoppingListComponent
  ]
})
export class AccountModule { }
