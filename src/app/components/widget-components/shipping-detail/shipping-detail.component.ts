import { Component, OnInit } from '@angular/core';
import { StorageService } from "../../../services/storage.service";
import { Router } from '@angular/router';
import { CartService } from '../../../services/cart.service';
import { AuthService } from '../../../authentications/authentication.service';
import { ProgressService } from '../../../services/checkout-progress.service';

@Component({
  selector: 'shippong-detail',
  templateUrl: 'shipping-detail.component.html',
  styleUrls: ['shipping-detail.component.scss']
})
export class ShippingDetailComponent implements OnInit {
  postCode;
  checkMsg;
  total;
  currentUser;
  constructor(private storeService:StorageService, private _router:Router,
  private cartService:CartService, private authService:AuthService,
  private progressService:ProgressService) {
    this.postCode = this.storeService.retriveData('postcode');
   }
  
  checkOut(){
    this._router.navigate(["/check/checkout"]);
      // this.total = this.cartService.getTotal();
      // if(this.total == 0 || undefined){
      //   this.checkMsg = "Your basket is empty! add item";
      //   setTimeout(()=>{
      //     this.checkMsg = false;
      //   }, 8000);
      //   return;
      // }else if(this.total < 40){
      //   this.checkMsg = "You must spend £40 or more";
      //   setTimeout(()=>{
      //     this.checkMsg = false;
      //   }, 8000);
      //   return;
      // }else{
      //   if(!this.currentUser){
      //     this._router.navigate(["/shop/login"]);
      //   }else{
      //     this.progressService.deleteProgress();
      //     //wait until the progress is completely deleted
      //     setTimeout(()=>{
      //       this._router.navigate(["/check/checkout"]);
      //     }, 1000);
      //   }
      // }
    
  }

  ngOnInit() {
    this.total = this.cartService.getTotal();
    let seeE = document.getElementById('see-cart');
      setInterval(()=>{
        // seeE.style.opacity = "1";
        seeE.style.color = "#FF9100";
        setTimeout(()=>{
          // seeE.style.opacity = "0";
          seeE.style.color = "#00897B";
        }, 1000)
      }, 2000)
      seeE.style.opacity = "1";
      this.authService.authState().subscribe(user=>{
        this.currentUser = user;
      });
  }
}
