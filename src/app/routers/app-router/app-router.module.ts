import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { CatModule } from '../../components/products/prod-category/category.module';

import { HomeComponent } from '../../components/home/home.component';
import { NewProductComponent } from '../../components/products/new-product/new-product.component';
import { ProductComponent } from '../../components/products/product/product.component';
import { CategoryDisplayComponent } from '../../components/products/prod-category/category-display';
import { CartComponent } from "../../components/check-out/cart.component";
import { ProductViewComponent } from "app/components/products/product/product-view.component";
import { TaxanomyComponent } from "app/components/taxanomy/taxanomy.component";



const root:Route = {
  path: '',
    redirectTo: '/home', pathMatch: 'full'
}
const fallBack: Route = {
    path: '**', component: HomeComponent
}
const routes = [
  {path: 'home', component: HomeComponent},
  {path: 'new-product', component:NewProductComponent},
  {path: 'products', component: ProductComponent},
  {path: 'products/?', component: CategoryDisplayComponent },
  {path: 'basket', component: CartComponent},
  {path: 'product', component:ProductViewComponent},
  {path: 'taxanomy', component:TaxanomyComponent},
  root, fallBack
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {useHash: true})
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRouterModule { }
