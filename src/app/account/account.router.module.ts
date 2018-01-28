import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { AccountOutletComponent } from '../router-outlets/account-outlet.component';
import { AccountSettingComponent } from './account-setting/account-setting.component';
import { OrdersComponent } from './orders/orders.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';



const routes = [
    {
      path: 'account', component: AccountOutletComponent,
      children: [
        {path: 'account_setting', component: AccountSettingComponent},
        {path: 'your_orders', component: OrdersComponent},
        {path: 'shopping_list', component: ShoppingListComponent},
      ]
    }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AccountRouterModule { }
