import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ProductService } from "../../services/product.service";
// import * as firebase from 'firebase';
import * as _ from 'lodash';
// import { AdItem } from '../../components/advert/ad-item';
import { SearchService } from "../../services/search.service";
import { StorageService } from "../../services/storage.service";
import { CartService } from '../../services/cart.service';
import { AddressSearchService } from "../../services/addresssearch.service";
import { AuthService } from "../../authentications/authentication.service";
import { AdvertService } from '../../services/advert.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss']
})
export class HomeComponent implements OnInit {
  searchingPostcode;
  ads;
  emptyErr;
  successMsg;

  constructor(private _router:Router, private searchService:SearchService, 
  private PS:ProductService, private storeService:StorageService,
  private cartService:CartService, private addressService:AddressSearchService,
  private authService:AuthService, private advertService:AdvertService) {
    // title.setTitle('Welcome to our shop');
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
      }, 8000)
    // this.emptyErr = "Please enter a valid postcode";
    
  }
  //  onButtonClick() {
  //    this.authService.authState().subscribe((user)=>{
  //      let u = {email: user.email, password: user.uid};
  //      this.authService.clientRegistration(u)
  //       .subscribe((res)=>{
  //         // console.log(res);
  //         if(res.code == 11000){
  //           console.log(`ResCode: ${res.code} `);
  //         }else{
  //           this.authService.getClientToken(u).subscribe((token)=>{
  //             console.log(token);
  //           });
  //         }
  //       });
  //    });
  //   //  this.authService.authState();
  //   // this.cartService.removeBatchCart("SE14 5AA");
  //   //  this.PS.getQueryProduct(q).subscribe((products)=>{
  //   //    console.log(products);
  //   //  });
  //       // this.title = 'Hello from Kendo UI!';
  //   }

  ngOnInit() {
    // this.ads = this.PS.getAds();
    // this.addressService.getMyIp().subscribe((data)=>{
    //   this.storeService.storeData('ip', data.ip);
    // })
    
    // this.PS.getGQLdept();
    // console.log(this.ads);
    // console.log(window.location);
    // this.PS.getProducts().subscribe(res=> console.log(res));
    this.PS.getStoreAd().subscribe((res)=> {
      this.ads = res;
      // console.log(res);
    });
    this.advertService.getAdvert().subscribe((ad)=>{
      
      this.ads = _.take(ad, 4);
      // console.log(this.ads);
    });
  }

}
