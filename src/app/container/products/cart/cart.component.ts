import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { iCart } from "../../../models/cart.model";
import { Observable } from "rxjs/Observable";
import { CartService } from '../../../services/cart.service';
import { StorageService } from "../../../services/storage.service";
import { Location } from '@angular/common';


@Component({
    selector: 'shop-cart',
    templateUrl: 'carts/cart.component.html',
    styleUrls: ['carts/cart.component.scss']
})
export class CartComponent {
    discoutSave:number = 40;
    cart$:Observable<iCart>;
    constructor(private cartService:CartService, private _location:Location, private _router:Router, 
        private storeService:StorageService){
     cartService.getCart().subscribe((carts)=>{
         this.cart$ = carts.filter(cat=> cat.postcode == this.storeService.retriveData('postcode'));
       })

    }
    checkOut(){
        this._router.navigate(["/checkout"]);
    }
    removeCart(cart){
        this.cartService.removeCart(this.payLoad(cart));
    }
    goBack(){
        this._location.back();
    }

    increment(product){
        this.cartService.incrementCart(this.payLoad(product));
    //  this.store.dispatch({type: cart.INCREMENT, payload: this.payLoad(product)})
    }
    decrement(product, e){
        if(product.qty == 1){
            e.target.innerHTML = "pan_tool";
            e.target.style.color = "red";
            return;
        //    this.cartService.removeCart(this.payLoad(product));
        }else{
            this.cartService.decrementCart(this.payLoad(product));
        }
  
    //  this.store.dispatch({type: cart.DECREMENT, payload: this.payLoad(product)})
        
    }
    private payLoad(product) {
      return {
        key$: product.$key,
        name: product.name,
        id: product.id,
        price: product.price,
        qty: product.qty
      }
   }

}