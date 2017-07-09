import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';

import { HomeComponent } from '../../container/home/home.component';
import { CartComponent } from "../../container/check-out/cart.component";


import * as products from '../../container/products/index';
 

const root:Route = {
  path: '',
    redirectTo: '/home', pathMatch: 'full'
}
const fallBack: Route = {
    path: '**', component: HomeComponent
}
const routes = [
  {path: 'home', component: HomeComponent},
  {path: 'products/?', component: products.ProductComponent},
  // {path: 'products/?', component: products.CategoryDisplayComponent },
  {path: 'basket', component: CartComponent},
  {path: 'product', component:products.ProductViewComponent},
  // {path: 'dashboard', component:DashboardComponent},
  root, fallBack
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
