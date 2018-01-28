import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { CartService } from '../../services/cart.service';
import * as firebase from 'firebase';
import { AuthService } from '../authentication.service';
import { StorageService } from "../../services/storage.service";
import { ClearHeighlightMenu } from "../../services/clearfunction.service";
import { Store } from '@ngrx/store';
import * as authAction from '../../store-management/actions/auth.action';
import { DbService } from '../../services/db.service';
import { Cart } from '../../store-management/models/cart.model';
export type Actions = authAction.All;


@Component({
  selector: 'notify',
  templateUrl: 'notify.component.html',
  styleUrls: ['notify.component.scss']
})
export class NotifyComponent implements OnInit {
  totalPrice;
  authenticated:boolean = false;
  dropDown:boolean = false;
  sum;
  limitMsg:string;
  currentUser;

  constructor(
    private cartService:CartService, 
    private authService:AuthService, 
    private storeService:StorageService, 
    private clearHeighlightMenu:ClearHeighlightMenu,
    private _router:Router,
    private store: Store<any>,

  ) {
    store.select('auth').subscribe((auth)=> {
      // console.log("User Auth:", auth);
      this.currentUser = auth.displayName;
    });
    
   }
   goCheckOut(){
      if(this.sum > 40){
        if(this.currentUser){
          this._router.navigate(["/check/checkout"]);
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

  logOut(){
    this.authService.logout().then((res)=> {
      this.store.dispatch({type: authAction.LOGOUT, payload: 'auth'});
      // setTimeout(()=>{this._router.navigate(["/login"]);}, 500)
      
  })
  .catch(error=> console.log(error));

  }

  clearMenu(){
    this.clearHeighlightMenu.clearMenu();
  }
  ngOnInit() {
    this.store.select('cart').subscribe((cart: Cart[]) => {
      let total = cart.map(cart=>cart.qty * Number(cart.price));
      this.sum = total.reduce((sum, num)=>{return sum + num}, 0).toFixed(2);
    });
  }
 

}
