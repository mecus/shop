import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from './modules/material/material.module';
// import { Ng2Webstorage } from 'ng2-webstorage';
import { AppSharedModule } from "./modules/shared-modules/app.shared.module";
import { PostcodeModule } from './modules/postcode-module/postcode.module';

//Bootstrap Modules
// import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
// import { CarouselModule } from 'ngx-bootstrap/carousel';
// import { AlertModule } from 'ngx-bootstrap/alert';

//cloudinary module
// import { Ng2CloudinaryModule } from 'ng2-cloudinary';
// import { FileUploadModule } from 'ng2-file-upload';

import { AuthenticationsModule } from "./authentications/authentications.module";
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { firebaseConfig } from './firebase-configuration';


//Needed Hammerjs to work with material Design module
// import 'hammerjs';

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



// import { CustomersComponent } from './container/customers/customers.component';
// import { BannerComponent } from './components/advert/banner.component';
// import { NewProdComponent } from './components/advert/dynamic-components/newprod.component';
// import { NewCatComponent } from './components/advert/dynamic-components/newcat.component';



// import { FooterComponent } from './container/menu/footer/footer.component';
// import { ProductSearchComponent } from './components/product-search/product-search.component';
// import { HowToComponent } from './components/how-to/how-to.component';
// import { PrimaryNavigationComponent } from './container/menu/primary-navigation/primary-navigation.component';


// const BootstrapModules = [ CarouselModule.forRoot()]
import { LibModule } from 'confirm-alert';

@NgModule({
  declarations: [
    AppComponent, 
    HomeComponent,
    CookieNoticeComponent
    
   
  ],
  imports: [
    BrowserAnimationsModule, LibModule,
    BrowserModule.withServerTransition({appId: 'shop'}),
    FormsModule,MaterialModule, ReactiveFormsModule,
    HttpModule, AppRouterModule,ProductModule, CheckOutModule,
    AppSharedModule, ShopModule, PostcodeModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,AngularFireAuthModule,
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
