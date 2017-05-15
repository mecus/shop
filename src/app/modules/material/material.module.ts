import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MdButtonModule, MdCheckboxModule,MdToolbarModule,
  MdIconModule, MdMenuModule, MdInputModule, MdCardModule,
  MdGridListModule
} from '@angular/material';
  

@NgModule({
  imports: [
    CommonModule,
     MdButtonModule, MdCheckboxModule,MdIconModule,MdMenuModule,
     MdToolbarModule, MdInputModule, MdCardModule, MdGridListModule
  ],
  exports: [
    MdButtonModule, MdCheckboxModule,MdIconModule,MdMenuModule,
    MdToolbarModule, MdInputModule, MdCardModule, MdGridListModule
  ],
  declarations: []
})
export class MaterialModule { }
