import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from './share-modules/material/material.module';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AuthenticationsModule } from "./authentications/authentications.module";
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
// import { AngularFireDatabaseModule } from 'angularfire2/database';

import { firebaseConfig } from './environment-var';


//Needed Hammerjs to work with material Design module
import 'hammerjs';

//Custom Modules
// import { HomeModule } from './home/home.module';
import { AppRouterModule } from './app.router.module';
import { CheckOutModule } from './container/check-out/check-out.module';
import { AccountModule } from "./account/account.module";
import { ShopModule } from "./container/shop-container/shop.module";

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
import { CookieNoticeComponent } from './container/shop-container/cookie-notice/cookie-notice.component';
import { HomeComponent } from './home/home.component';
import { AppSharedModule } from './share-modules/app.shared.module';
import { NgeCarouselModule } from './share-modules/carousel-module/nge-carousel.module';
import { PostcodeModule } from './share-modules/postcode-module/postcode.module';
import { ShopService } from './services/shop.service';
import { AuthService } from './authentications/authentication.service';
// import { UploadImageService } from './admin/services/image-upload.service';
// import { AdminService } from './admin/services/admin.service';

import { Reducers } from './store-management/reducers/index';
import { DbService } from './services/db.service';
import { ShopEffect } from './store-management/effects/shop.effect';
import { CartEffects } from './store-management/effects/cart.effect';
import { Effects } from './store-management/effects/effectIndex';

@NgModule({
  declarations: [
    AppComponent, 
    HomeComponent,
    CookieNoticeComponent, 
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule.withServerTransition({appId: 'shop'}),
    FormsModule, MaterialModule, ReactiveFormsModule,
    HttpModule, 
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule, AngularFireAuthModule,

    //Store module initialization
    EffectsModule.forRoot(Effects),
    StoreModule.forRoot(Reducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25 // Retains last 25 states
      // logOnly: environment.production // Restrict extension to log-only mode
    }),

    AppSharedModule,
    NgeCarouselModule,
    PostcodeModule,

    // Router Modules

    AppRouterModule,
    // Custom Modules
    AuthenticationsModule,
    AccountModule,
    CheckOutModule,
    ShopModule
    // lazy loading ShopModule,
  ],
  providers: [
    AuthService, ProductService, ShopService, CartService, StorageService, SearchService,
    ReviewService, YoutubeService, WindowService, ClearHeighlightMenu,
    AddressSearchService, AccountService, AdvertService, MailerService,
    DbService

    ],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
