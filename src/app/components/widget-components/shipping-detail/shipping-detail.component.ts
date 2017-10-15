import { Component, OnInit } from '@angular/core';
import { StorageService } from "../../../services/storage.service";
import { Router } from '@angular/router';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'shippong-detail',
  templateUrl: 'shipping-detail.component.html',
  styleUrls: ['shipping-detail.component.scss']
})
export class ShippingDetailComponent implements OnInit {
  postCode;
  checkMsg;
  constructor(private storeService:StorageService, private _router:Router,
  private cartService:CartService) {
    this.postCode = this.storeService.retriveData('postcode');
   }

  checkOut(){
    let total = this.cartService.getTotal();
    if(total == 0 || undefined){
      this.checkMsg = "Your basket is empty! add item";
      setTimeout(()=>{
        this.checkMsg = false;
      }, 8000);
      return;
    }else if(total < 40){
      this.checkMsg = "You must spend £40 or more";
      setTimeout(()=>{
        this.checkMsg = false;
      }, 8000);
      return;
    }else{
      this._router.navigate(["/checkout"]);
    }
  }

  ngOnInit() {
 

  }

}
