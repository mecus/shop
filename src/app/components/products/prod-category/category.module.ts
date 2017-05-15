import { NgModule } from "@angular/core";
import { CategoryDisplayComponent } from "./category-display";
import { MaterialModule } from "app/modules/material/material.module";
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CheckOutModule } from "app/components/check-out/check-out.module";





@NgModule({
    declarations: [ CategoryDisplayComponent ],
    imports: [BrowserModule, MaterialModule, 
            BrowserAnimationsModule, CheckOutModule],
    exports: []
})


export class CatModule {}