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
import {MdTableModule} from '@angular/material';
import {MdRadioModule} from '@angular/material';
import {MdProgressBarModule} from '@angular/material';
import {MdProgressSpinnerModule} from '@angular/material';
  

@NgModule({
  imports: [
    CommonModule,
     MdButtonModule, MdCheckboxModule,MdIconModule,MdMenuModule,
     MdToolbarModule, MdInputModule, MdCardModule, MdGridListModule,
     MdSelectModule, MdSidenavModule, MdDialogModule, MdChipsModule,
     MdListModule, MdTableModule, MdRadioModule, MdProgressBarModule,
     MdProgressSpinnerModule
  ],
  exports: [
    MdButtonModule, MdCheckboxModule,MdIconModule,MdMenuModule,
    MdToolbarModule, MdInputModule, MdCardModule, MdGridListModule,
    MdSelectModule, MdSidenavModule, MdDialogModule, MdChipsModule,
    MdListModule, MdTableModule, MdRadioModule, MdProgressBarModule,
    MdProgressSpinnerModule
  ],
  declarations: []
})
export class MaterialModule { }
