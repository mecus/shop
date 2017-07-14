import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from './modules/material/material.module';
import { Ng2Webstorage } from 'ng2-webstorage';


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
import { cartReducer } from './store/reducers/cart-reducer';
// import { CartEffects } from "./store/effects/cart-effect";



//Needed Hammerjs to work with material Design module
import 'hammerjs';

//Custom Modules
import { AppRouterModule } from './routers/app-router/app-router.module';
import { ProductModule } from './container/products/product.module';
import { CheckOutModule } from './container/check-out/check-out.module';

//Services
import { ProductService } from "app/services/product.service";
import { CartService } from 'app/services/cart.service';
import { StorageService } from "app/services/storage.service";
import { SearchService } from "app/services/search.service";
import { ReviewService } from "app/services/review.service";

//Directives
import { AdvertDirective } from './directives/advert.directive';

//Component
import { AppComponent } from './app.component';
import { TopMenuComponent } from './container/menu/top-menu/top-menu.component';
import { SubMenuComponent } from './container/menu/top-menu/sub-menu';
import { HomeComponent } from './container/home/home.component';
import { CustomersComponent } from './container/customers/customers.component';
import { BannerComponent } from './components/advert/banner.component';
import { NewProdComponent } from './components/advert/dynamic-components/newprod.component';
import { NewCatComponent } from './components/advert/dynamic-components/newcat.component';
import { FooterComponent } from './container/menu/footer/footer.component';
import { ProductSearchComponent } from './components/product-search/product-search.component';



@NgModule({
  declarations: [
    AppComponent, TopMenuComponent, 
    HomeComponent,SubMenuComponent, CustomersComponent,
    AdvertDirective, BannerComponent, NewProdComponent, 
    NewCatComponent, FooterComponent, ProductSearchComponent, 
   
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'shop-front'}),
    BrowserAnimationsModule,
    FormsModule,MaterialModule, ReactiveFormsModule,
    HttpModule, AppRouterModule,ProductModule, CheckOutModule,
    StoreModule.provideStore(cartReducer),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),

    // EffectsModule.run(CartEffects),

    DBModule.provideDB(schema),

    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,AngularFireAuthModule,
    ButtonsModule, AuthenticationsModule,
    Ng2Webstorage
  ],
  providers: [
    ProductService, CartService, StorageService, SearchService,
    ReviewService
    ],
  bootstrap: [AppComponent],
  entryComponents: [NewProdComponent, NewCatComponent]
})
export class AppModule { }
