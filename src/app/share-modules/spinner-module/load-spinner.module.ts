import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatProgressSpinnerModule } from '@angular/material';
import { LoadSpinnerComponent } from './spinner/load-spinner.component';

@NgModule({
    declarations: [LoadSpinnerComponent],
    imports: [BrowserModule, MatProgressSpinnerModule],
    exports: [LoadSpinnerComponent]
})

export class LoadSpinnerModule {

}