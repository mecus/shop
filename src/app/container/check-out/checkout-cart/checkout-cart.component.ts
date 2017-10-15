import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { Observable } from "rxjs/Observable";
import { StorageService } from "../../../services/storage.service";
import { TempOrderService } from "../../../services/temp-order.service";
import { AuthService } from "../../../authentications/authentication.service";
import { WindowService } from "../../../services/window.service";

@Component({
  selector: 'checkout-cart',
  templateUrl: 'checkout-cart.component.html',
  styleUrls: ['checkout-cart.component.scss']
})
export class CheckoutCartComponent implements OnInit {
  cart$: Observable<any>;
  totalBask=null;
  delivery=null;
  constructor(private cartService:CartService, private storeService:StorageService,
  private tempOrderService:TempOrderService, private authService:AuthService,
  private windowService:WindowService) {
    cartService.getCart().subscribe((carts)=>{
        this.cart$ = carts.filter(cat=> cat.postcode == this.storeService.retriveData('postcode'));
      })
   }

  getProgresOrder(){
     this.authService.authState().subscribe((user)=>{
       this.tempOrderService.getTempOrder(user.uid).subscribe((ord)=>{
        if(ord){
          this.totalBask = Number(ord.ground_total);
          this.delivery = ord.delivery_option.method;
        } 
      })
    })
  }
  ngOnInit() {
    this.windowService.getWindowObject().setTimeout(()=> {
      this.getProgresOrder();
    }, 1000);
  }

}
