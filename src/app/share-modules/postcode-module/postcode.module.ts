import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostcodeComponent } from './postcode/postcode.component';
import { MaterialModule } from "../material/material.module";
import { PostCodeService } from './postcode.service';

@NgModule({
    declarations: [PostcodeComponent],
    imports: [CommonModule, MaterialModule],
    exports: [PostcodeComponent],
    providers: [PostCodeService]

})

export class PostcodeModule {}