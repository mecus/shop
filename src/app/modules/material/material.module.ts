import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MdButtonModule, MdCheckboxModule,MdToolbarModule,
  MdIconModule, MdMenuModule, MdInputModule, MdCardModule,
  MdGridListModule
} from '@angular/material';
import {MdSelectModule} from '@angular/material';
import {MdSidenavModule} from '@angular/material';
import {MdDialogModule} from '@angular/material';
import {MdChipsModule} from '@angular/material';
import {MdListModule} from '@angular/material';
  

@NgModule({
  imports: [
    CommonModule,
     MdButtonModule, MdCheckboxModule,MdIconModule,MdMenuModule,
     MdToolbarModule, MdInputModule, MdCardModule, MdGridListModule,
     MdSelectModule, MdSidenavModule, MdDialogModule, MdChipsModule,
     MdListModule
  ],
  exports: [
    MdButtonModule, MdCheckboxModule,MdIconModule,MdMenuModule,
    MdToolbarModule, MdInputModule, MdCardModule, MdGridListModule,
    MdSelectModule, MdSidenavModule, MdDialogModule, MdChipsModule,
    MdListModule
  ],
  declarations: []
})
export class MaterialModule { }
