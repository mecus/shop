import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MdButtonModule, MdCheckboxModule,MdToolbarModule,
  MdIconModule, MdMenuModule, MdInputModule, MdCardModule,
  MdGridListModule, MdSelectModule, MdSidenavModule,
  MdDialogModule, MdChipsModule, MdListModule, MdTableModule,
  MdRadioModule, MdProgressBarModule, MdProgressSpinnerModule,
  MdPaginatorModule, MdExpansionModule, MdDatepickerModule
} from '@angular/material';

  

@NgModule({
  imports: [
    CommonModule,
    MdButtonModule, MdCheckboxModule,MdIconModule,MdMenuModule,
    MdToolbarModule, MdInputModule, MdCardModule, MdGridListModule,
    MdSelectModule, MdSidenavModule, MdDialogModule, MdChipsModule,
    MdListModule, MdTableModule, MdRadioModule, MdProgressBarModule,
    MdProgressSpinnerModule, MdPaginatorModule, MdExpansionModule,
    MdDatepickerModule
  ],
  exports: [
    MdButtonModule, MdCheckboxModule,MdIconModule,MdMenuModule,
    MdToolbarModule, MdInputModule, MdCardModule, MdGridListModule,
    MdSelectModule, MdSidenavModule, MdDialogModule, MdChipsModule,
    MdListModule, MdTableModule, MdRadioModule, MdProgressBarModule,
    MdProgressSpinnerModule, MdPaginatorModule, MdExpansionModule,
    MdDatepickerModule
  ],
  declarations: []
})
export class MaterialModule { }
