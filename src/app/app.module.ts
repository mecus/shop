import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from './modules/material/material.module';
import { Ng2Webstorage } from 'ng2-webstorage';
import { AppSharedModule } from "app/modules/shared-modules/app.shared.module";

//Bootstrap Modules
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { AlertModule } from 'ngx-bootstrap/alert';

//cloudinary module
import { Ng2CloudinaryModule } from 'ng2-cloudinary';
import { FileUploadModule } from 'ng2-file-upload';

import { AuthenticationsModule } from "app/authentications/authentications.module";
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { firebaseConfig } from './firebase-configuration';

// Import the ButtonsModule
import { ButtonsModule } from '@progress/kendo-angular-buttons';

//Store // Reducers // Effects
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { DBModule } from '@ngrx/db';
import { schema } from './db';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { appState } from './store/reducers/appState.reducer';
// import { CartEffects } from "./store/effects/cart-effect";



//Needed Hammerjs to work with material Design module
import 'hammerjs';

//Custom Modules
import { AppRouterModule } from './routers/app-router/app-router.module';
import { ProductModule } from './container/products/product.module';
import { CheckOutModule } from './container/check-out/check-out.module';
import { AccountModule } from "app/account/account.module";

//Services
import { ProductService } from "app/services/product.service";
import { CartService } from 'app/services/cart.service';
import { StorageService } from "app/services/storage.service";
import { SearchService } from "app/services/search.service";
import { ReviewService } from "app/services/review.service";
import { YoutubeService } from "app/services/youtube.service";
import { WindowService } from "app/services/window.service";
import { ClearHeighlightMenu } from "app/services/clearfunction.service";
import { AddressSearchService } from "app/services/addresssearch.service";
import { AccountService } from "app/services/account.service";

//Directives
import { AdvertDirective } from './directives/advert.directive';
// import { HoverMenuDirective } from './directives/hover-menu.directive';
// import { SelectMenuDirective } from './directives/select-menu.directive';

//Pipes
// import { YoutubePipe } from './pipes/youtube.pipe';

//Component
import { AppComponent } from './app.component';
// import { TopMenuComponent } from './container/menu/top-menu/top-menu.component';
// import { SubMenuComponent } from './container/menu/top-menu/sub-menu';
import { HomeComponent } from './container/home/home.component';
import { CustomersComponent } from './container/customers/customers.component';
import { BannerComponent } from './components/advert/banner.component';
import { NewProdComponent } from './components/advert/dynamic-components/newprod.component';
import { NewCatComponent } from './components/advert/dynamic-components/newcat.component';


// import { FooterComponent } from './container/menu/footer/footer.component';
// import { ProductSearchComponent } from './components/product-search/product-search.component';
// import { HowToComponent } from './components/how-to/how-to.component';
// import { PrimaryNavigationComponent } from './container/menu/primary-navigation/primary-navigation.component';






const BootstrapModules = [BsDropdownModule.forRoot(), AlertModule.forRoot(), CarouselModule.forRoot()]

@NgModule({
  declarations: [
    AppComponent, 
    HomeComponent, CustomersComponent,
    AdvertDirective, BannerComponent, NewProdComponent, 
    NewCatComponent
    
   
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'shop-front'}),
    BrowserAnimationsModule,
    FormsModule,MaterialModule, ReactiveFormsModule,
    HttpModule, AppRouterModule,ProductModule, CheckOutModule,
    StoreModule.provideStore(appState),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    BootstrapModules, AppSharedModule,
    // EffectsModule.run(CartEffects),

    DBModule.provideDB(schema),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,AngularFireAuthModule,
    ButtonsModule, AuthenticationsModule,
    Ng2Webstorage, AccountModule
  ],
  providers: [
    ProductService, CartService, StorageService, SearchService,
    ReviewService, YoutubeService, WindowService, ClearHeighlightMenu,
    AddressSearchService, AccountService
    ],
  bootstrap: [AppComponent],
  entryComponents: [NewProdComponent, NewCatComponent]
})
export class AppModule { }
