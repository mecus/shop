import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { iCart } from "../../../models/cart.model";
import { Observable } from "rxjs/Observable";
import { CartService } from '../../../services/cart.service';
import { StorageService } from "app/services/storage.service";
import { Location } from '@angular/common';


@Component({
    selector: 'shop-cart',
    templateUrl: 'carts/cart.component.html',
    styleUrls: ['carts/cart.component.scss']
})
export class CartComponent {
    cart$:Observable<iCart>;
    constructor(private cartService:CartService, private _location:Location, private _router:Router, 
        private storeService:StorageService){
     cartService.getCart().subscribe((carts)=>{
         this.cart$ = carts.filter(cat=> cat.postcode == this.storeService.retriveData('postcode'));
       })

    }
    removeCart(cart){
        this.cartService.removeCart(this.payLoad(cart));
    }
    goBack(){
        this._location.back();
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