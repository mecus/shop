import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './authentications/login/sign-in.component';
import { RegisterComponent } from './authentications/register/register.component';
import { ResetPassword } from './authentications/reset-password/reset/reset-password.component';


const root:Route = {
  path: '',
    redirectTo: '/home', pathMatch: 'full'
}
const fallback: Route = {
    path: '**', component: HomeComponent
}
const routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent },
  {path: 'register', component: RegisterComponent},
  {path: 'reset_password', component: ResetPassword},
  {path: 'admin', loadChildren: './admin/admin.module#AdminModule'},
  // {path: 'shop', loadChildren: './container/shop-container/shop.module#ShopModule'},
  root,
  // fallback
  
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRouterModule { }
