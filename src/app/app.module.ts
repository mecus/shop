import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from './modules/material/material.module';
import { AppSharedModule } from "./modules/shared-modules/app.shared.module";
import { PostcodeModule } from './modules/postcode-module/postcode.module';


import { AuthenticationsModule } from "./authentications/authentications.module";
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
// import { AngularFireDatabaseModule } from 'angularfire2/database';

import { firebaseConfig } from './environment-var';


//Needed Hammerjs to work with material Design module
import 'hammerjs';

//Custom Modules
import { AppRouterModule } from './routers/app-router/app-router.module';
import { ProductModule } from './container/products/product.module';
import { CheckOutModule } from './container/check-out/check-out.module';
import { AccountModule } from "./account/account.module";
import { ShopModule } from "./container/shop-container/shop-module/shop.module";

//Services
import { AdvertService } from "./services/advert.service";
import { ProductService } from "./services/product.service";
import { CartService } from './services/cart.service';
import { StorageService } from "./services/storage.service";
import { SearchService } from "./services/search.service";
import { ReviewService } from "./services/review.service";
import { YoutubeService } from "./services/youtube.service";
import { WindowService } from "./services/window.service";
import { ClearHeighlightMenu } from "./services/clearfunction.service";
import { AddressSearchService } from "./services/addresssearch.service";
import { AccountService } from "./services/account.service";
import { MailerService } from "./services/mailer.service";

//Directives
// import { AdvertDirective } from './directives/advert.directive';
// import { HoverMenuDirective } from './directives/hover-menu.directive';
// import { SelectMenuDirective } from './directives/select-menu.directive';

//Pipes
// import { YoutubePipe } from './pipes/youtube.pipe';

//Component
import { AppComponent } from './app.component';
// import { TopMenuComponent } from './container/menu/top-menu/top-menu.component';
// import { SubMenuComponent } from './container/menu/top-menu/sub-menu';
import { HomeComponent } from './container/home/home.component';
import { CookieNoticeComponent } from './container/shop-container/cookie-notice/cookie-notice.component';


import { LibModule } from 'confirm-alert';
import { NgeCarouselModule } from './modules/carousel-module/nge-carousel.module';

@NgModule({
  declarations: [
    AppComponent, 
    HomeComponent,
    CookieNoticeComponent
    
   
  ],
  imports: [
    BrowserAnimationsModule, LibModule, NgeCarouselModule,
    BrowserModule.withServerTransition({appId: 'shop'}),
    FormsModule,MaterialModule, ReactiveFormsModule,
    HttpModule, AppRouterModule,ProductModule, CheckOutModule,
    AppSharedModule, ShopModule, PostcodeModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,AngularFireAuthModule,
    AuthenticationsModule,
    AccountModule,
  ],
  providers: [
    ProductService, CartService, StorageService, SearchService,
    ReviewService, YoutubeService, WindowService, ClearHeighlightMenu,
    AddressSearchService, AccountService, AdvertService, MailerService
    ],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
