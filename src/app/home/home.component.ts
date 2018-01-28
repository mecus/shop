import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ProductService } from "../services/product.service";
import { trigger, state, style, animate, transition } from '@angular/animations';
// import * as firebase from 'firebase';
import * as _ from 'lodash';
// import { AdItem } from '../../components/advert/ad-item';
import { SearchService } from "../services/search.service";
import { StorageService } from "../services/storage.service";
import { CartService } from '../services/cart.service';
import { AddressSearchService } from "../services/addresssearch.service";
import { AuthService } from "../authentications/authentication.service";
import { AdvertService } from '../services/advert.service';
import { Store } from '@ngrx/store';
import { iShop } from '../store-management/models/shop.model';
import  * as shopActions from '../store-management/actions/shop.action';
import { DbService } from '../services/db.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss','home-mobile.component.scss'],
  animations: [
    trigger('movehome', [
      state('start', style({
        transform: 'scale(1)',
        backgroundColor: '#fff'
      })),
      state('end', style({
        transform: 'scale(1.1)',
        backgroundColor: 'red'
      })),
      transition('start => end', [animate('300ms ease-in')]),
      transition('end => start', [animate('300ms ease-out')])

    ])
  ]
})
export class HomeComponent implements OnInit {
  userlogin: string = "Login here";
  currentUser;
  category$;
  // searchingPostcode;
  ads;
  emptyErr;
  successMsg;
  state:string = 'start';
  openPostInput;
  options = {
    speed:  80000,
    width: "100%",
    height: "300px",
    opacity: "1"
  };
  
  constructor(
    private _router:Router, private searchService:SearchService, 
    private PS:ProductService, private storeService:StorageService,
    private cartService:CartService, private addressService:AddressSearchService,
    private authService:AuthService, private advertService:AdvertService,
    private store: Store<any>,
    ) {
    // title.setTitle('Welcome to our shop');
    // console.log(this.store.select('appState'));
    this.category$ = PS.getStoreDepartment()
    .map(snapshot => {
      return snapshot.map(d => {
        let id = d.payload.doc.id;
        let data = d.payload.doc.data();
        return {id, ...data};
      })
    });
    
   }
  bestOffer(){
    this.store.dispatch({type: shopActions.OFFER, payload: 'yes'});
    this._router.navigate(["/shop/offer/products"]);
  }
 
   gotoLogin(){
     if(this.currentUser){
       this.userlogin = "A user has logged on!";
       return;
     }else{
      this._router.navigate(["/shop/login"]);
     }
   }
   animate(){
     this.state = (this.state == 'start'? 'end': 'start');
   }
  counter = 0;
  openPostBox(){
    setTimeout(()=>{
      this.openPostInput = "open" + this.counter++;
    }, 300);
  }
   
  continueShop(){
    this._router.navigate(["/shop/products/searching..."]);
  }
  goToCategory(dept){
    this.store.dispatch({type: shopActions.DEPARTMENT, payload: dept.id});
    this._router.navigate(["/shop/mob_department/"+dept.name]);

  }

  // submitPostcode(postcode){
  //   let postCode = postcode.toUpperCase();
  //   if(postcode === ""){
  //     this.emptyErr = "please enter a valid postcode";
  //     return;
  //   }
  //   this.searchingPostcode = true;
  //   this.addressService.findAddres(postCode)
  //     .subscribe((address)=>{
  //       if(address.addresses[0].includes('London')){
  //         this.searchingPostcode = false;
  //         this.successMsg = "Congratulations...We can deliver to you.";
  //         this.storeService.storeData('postcode', postCode);
  //         return;
  //       }else{
  //         this.emptyErr = "Sorry! We can not deliver to you!!";
  //         this.searchingPostcode = false;
  //       }
        
  //     });
  //     setTimeout(()=>{
  //       this.searchingPostcode = false;
  //     }, 8000)
  //   // this.emptyErr = "Please enter a valid postcode";
    
  // }

  ngOnInit() {
  
    // this.addressService.getMyIp().subscribe((data)=>{
    //   this.storeService.storeData('ip', data.ip);
    // })
  this.authService.authState().subscribe((userstate)=>{
    this.currentUser = userstate;
  });
    this.advertService.getAdvertCached().subscribe((ad)=>{
      //Transforming image object to string array with lodash _map
      this.ads = _.map(_.take(ad, 4), 'photo_url');
      // console.log(this.ads); 
    });
  }

}
