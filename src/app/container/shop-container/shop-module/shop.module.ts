import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelpComponent } from '../help/help.component';
import { AppSharedModule } from "../../../modules/shared-modules/app.shared.module";
import { MaterialModule } from "../../../modules/material/material.module";
import { TermsComponent } from '../terms/terms.component';
import { CookiePrivacyComponent } from '../cookie-privacy/cookie-privacy.component';
import { SiteMapComponent } from '../site-map/site-map.component';
import { ShopService } from '../../../services/shop.service';
import { VideoInstructionComponent } from '../video-instruction/video-instruction.component';
import { NgeCarouselModule } from '../../../modules/carousel-module/nge-carousel.module';

@NgModule({
  imports: [
    CommonModule, AppSharedModule, MaterialModule,
    NgeCarouselModule
  ],
  declarations: [
    HelpComponent, TermsComponent, CookiePrivacyComponent,
    SiteMapComponent, VideoInstructionComponent
  ],
  providers: [ShopService]
})
export class ShopModule { }
