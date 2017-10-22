import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { CartService } from '../../services/cart.service';
import * as firebase from 'firebase';
import { AuthService } from '../authentication.service';
import { StorageService } from "../../services/storage.service";
import { ClearHeighlightMenu } from "../../services/clearfunction.service";

@Component({
  selector: 'notify',
  templateUrl: 'notify.component.html',
  styleUrls: ['notify.component.scss']
})
export class NotifyComponent implements OnInit {
  totalPrice:Observable<number>;
  authenticated:boolean = false;
  dropDown:boolean = false;
  sum;
  limitMsg:string;

  constructor(private cartService:CartService, private authService:AuthService, 
  private storeService:StorageService, private clearHeighlightMenu:ClearHeighlightMenu,
  private _router:Router) {
    this.authChange();
    
   }
   goCheckOut(){
      if(this.sum > 40){
        if(this.authenticated == true){
          this._router.navigate(["/checkout"]);
        }else{
          this._router.navigate(["/login"]);
        }
  
       }else{
        this.limitMsg = "You need to spend £40 or more";
        setTimeout(()=>{
          this.limitMsg = "";
        }, 8000);
      }
    // this._router.navigate(["/checkout"]);
   }
   cartOption(){
    //  let domE = document.getElementById("cart-option");
     this.dropDown = (this.dropDown == false? true : false);
    //  if(this.dropDown == true){
    //   domE.style.marginTop = "80px";
    //  }else{
    //   domE.style.marginTop = "-40px";
    //  }
   }
   authChange(){
    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        this.authenticated = true;
      }else{
        this.authenticated = false;
      }
        // console.log(user)
    })
   }
  logOut(){
    this.storeService.cleardata('postcode');
    this.storeService.cleardata('email');
    this.storeService.cleardata('user');
    this.storeService.cleardata('uid');
    this.authService.logout();
  }
  clearMenu(){
    this.clearHeighlightMenu.clearMenu();
  }
  ngOnInit() {
    this.cartService.cartTotal().subscribe((carts)=>{
      let total = carts.filter(cart=> cart.postcode == this.storeService.retriveData('postcode'))
      .map(cart=>cart.qty * Number(cart.price));
       this.sum = total.reduce((sum, num)=>{return sum + num}, 0).toFixed(2);
      });
  }

}
