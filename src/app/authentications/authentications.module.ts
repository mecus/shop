import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireModule } from 'angularfire2';
import { StoreModule } from '@ngrx/store';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { MaterialModule } from "../share-modules/material/material.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShopRouterModule } from '../container/shop-container/shop.router.module';
import { HttpClientModule } from '@angular/common/http';
// import { BsDropdownModule } from 'ngx-bootstrap/dropdown';


import { AuthService } from './authentication.service';


import { LoginComponent } from './login/sign-in.component';
import { RegisterComponent } from './register/register.component';
import { AppSharedModule } from "../share-modules/app.shared.module";
import { ResetPassword } from "./reset-password/reset/reset-password.component";
import { ForgorttenPassword } from "./reset-password/forgotten/forgotten-password";
import { ChangePassword } from "./reset-password/change/change-password";
import { authReducer } from '../store-management/reducers/auth.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature('auth', authReducer),
    CommonModule, AngularFireModule, AngularFireDatabaseModule, ShopRouterModule,
    AngularFireAuthModule, MaterialModule, FormsModule, ReactiveFormsModule,
    AppSharedModule, HttpClientModule
  ],
  exports: [],

  declarations: [
    LoginComponent, RegisterComponent, ResetPassword,
    ForgorttenPassword, ChangePassword
  ],
  providers: [AuthService]
})
export class AuthenticationsModule { }
