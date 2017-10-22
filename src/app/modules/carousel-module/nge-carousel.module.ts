import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgeCarouselComponent } from './carousel-component/nge-carousel.component';
import { MatIconModule } from '@angular/material';

@NgModule({
    declarations: [NgeCarouselComponent],
    imports: [BrowserModule, MatIconModule, BrowserAnimationsModule],
    exports: [NgeCarouselComponent]
})

export class NgeCarouselModule {

}