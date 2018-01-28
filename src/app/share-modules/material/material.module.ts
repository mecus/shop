import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule, MatCheckboxModule,MatToolbarModule,
  MatIconModule, MatMenuModule, MatInputModule, MatCardModule,
  MatGridListModule, MatSelectModule, MatSidenavModule,
  MatDialogModule, MatChipsModule, MatListModule, MatTableModule,
  MatRadioModule, MatProgressBarModule, MatProgressSpinnerModule,
  MatPaginatorModule, MatExpansionModule, MatDatepickerModule,
  MatFormFieldModule
} from '@angular/material';

  

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule, MatCheckboxModule,MatToolbarModule,
    MatIconModule, MatMenuModule, MatInputModule, MatCardModule,
    MatGridListModule, MatSelectModule, MatSidenavModule,
    MatDialogModule, MatChipsModule, MatListModule, MatTableModule,
    MatRadioModule, MatProgressBarModule, MatProgressSpinnerModule,
    MatPaginatorModule, MatExpansionModule, MatDatepickerModule,
    MatFormFieldModule, MatTableModule
  ],
  exports: [
    MatButtonModule, MatCheckboxModule,MatToolbarModule,
    MatIconModule, MatMenuModule, MatInputModule, MatCardModule,
    MatGridListModule, MatSelectModule, MatSidenavModule,
    MatDialogModule, MatChipsModule, MatListModule, MatTableModule,
    MatRadioModule, MatProgressBarModule, MatProgressSpinnerModule,
    MatPaginatorModule, MatExpansionModule, MatDatepickerModule,
    MatFormFieldModule, MatTableModule
  ],
  declarations: []
})
export class MaterialModule { }
