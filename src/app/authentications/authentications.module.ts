import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { MaterialModule } from "app/modules/material/material.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRouterModule } from '../routers/app-router/app-router.module';
import { AlertModule } from 'ngx-bootstrap/alert';


import { AuthService } from './authentication.service';


import { LoginComponent } from './login/sign-in.component';
import { RegisterComponent } from './register/register.component';
import { NotifyComponent } from './notify/notify.component';
import { AppSharedModule } from "app/modules/shared-modules/app.shared.module";


@NgModule({
  imports: [
    CommonModule, AngularFireModule, AngularFireDatabaseModule, AppRouterModule,
    AngularFireAuthModule, MaterialModule, FormsModule, ReactiveFormsModule,
    AppSharedModule, AlertModule.forRoot()
  ],
  exports: [LoginComponent],

  declarations: [LoginComponent, RegisterComponent],
  providers: [AuthService]
})
export class AuthenticationsModule { }
