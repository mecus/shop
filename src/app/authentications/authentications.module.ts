import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { MaterialModule } from "app/modules/material/material.module";

import { AuthService } from './authentication.service';

import { LoginComponent } from './sign-in.component';


@NgModule({
  imports: [
    CommonModule, AngularFireModule, AngularFireDatabaseModule,
    AngularFireAuthModule, MaterialModule
  ],
  exports: [LoginComponent],

  declarations: [LoginComponent],
  providers: [AuthService]
})
export class AuthenticationsModule { }
