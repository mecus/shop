import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { ProductService } from "app/services/product.service";
import * as firebase from 'firebase';
import { AdItem } from '../../components/advert/ad-item';
import { SearchService } from "app/services/search.service";
import { StorageService } from "app/services/storage.service";
import { CartService } from 'app/services/cart.service';
import { AddressSearchService } from "app/services/addresssearch.service";
import { AuthService } from "app/authentications/authentication.service";



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  color = 'warm';mode = 'indeterminate';
  searchingPostcode;
  ads: AdItem[];
  list:Observable<{}>;
  counter:Observable<number>;
  title;imageUrl;emptyErr;successMsg;

  constructor(private _router:Router, private store:Store<any>, private searchService:SearchService, 
  private PS:ProductService, title:Title, private storeService:StorageService,
  private cartService:CartService, private addressService:AddressSearchService,
  private authService:AuthService) {
    title.setTitle('Welcome to our shop');
    // console.log(this.store.select('appState'));
   }
   
  continueShop(){
    this._router.navigate(["/products/?", {dept_id:"5953ee34e8cc187c531f8491", name:"Frozen Food", selected: true, code_number: 1001}])
  }
  submitPostcode(postcode){
    let postCode = postcode.toUpperCase();
    if(postcode === ""){
      this.emptyErr = "postcode must not be empty";
      return;
    }
    this.searchingPostcode = true;
    this.addressService.findAddres(postCode)
      .subscribe((address)=>{
        if(address.addresses[0].includes('London')){
          this.searchingPostcode = false;
          this.successMsg = "Congratulations...We can deliver to you.";
          this.storeService.storeData('postcode', postCode);
          return;
        }else{
          this.emptyErr = "Sorry! We can not deliver to you!!";
          this.searchingPostcode = false;
        }
        
      });
      setTimeout(()=>{
        this.searchingPostcode = false;
      }, 5000)
    // this.emptyErr = "Please enter a valid postcode";
    
  }
   onButtonClick() {
     this.authService.authState();
    // this.cartService.removeBatchCart("SE14 5AA");
    //  this.PS.getQueryProduct(q).subscribe((products)=>{
    //    console.log(products);
    //  });
        // this.title = 'Hello from Kendo UI!';
    }

  ngOnInit() {
    this.ads = this.PS.getAds();
    
    // console.log(this.ads);
    // console.log(window.location);
    // this.PS.getProducts().subscribe(res=> console.log(res));
    this.PS.getStoreAd().subscribe((res)=> {
      this.ads = res;
      // console.log(res);
    });

  }

}
