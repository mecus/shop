import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'app/modules/material/material.module';
import { AccountSettingComponent } from './account-setting/account-setting.component';
import { AppRouterModule } from 'app/routers/app-router/app-router.module';
import { AppSharedModule } from "app/modules/shared-modules/app.shared.module";
import { AccountInfoEditComponent } from './components/account-info-edit/account-info-edit.component';
import { AccountAddressEditComponent } from './components/account-address-edit/account-address-edit.component';

@NgModule({
  imports: [
    CommonModule, AppRouterModule, MaterialModule,
    AppSharedModule, FormsModule, ReactiveFormsModule
  ],
  declarations: [AccountSettingComponent, AccountInfoEditComponent, AccountAddressEditComponent]
})
export class AccountModule { }
