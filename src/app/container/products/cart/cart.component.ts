import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { iCart } from "../../../models/cart.model";
import { Observable } from "rxjs/Observable";
import { CartService } from '../../../services/cart.service';
import { StorageService } from "../../../services/storage.service";
import { Location } from '@angular/common';
import { AuthService } from '../../../authentications/authentication.service';


@Component({
    selector: 'shop-cart',
    templateUrl: 'carts/cart.component.html',
    styleUrls: ['carts/cart.component.scss']
})
export class CartComponent implements OnInit {
    discoutSave:number = 40;
    cart$;
    sum;
    currentUser;
    checkoutMsg;
    constructor(private cartService:CartService, private _location:Location, private _router:Router, 
        private storeService:StorageService, private authService:AuthService){
     cartService.getListCart().map(carts =>{
        return carts.map(val =>{
            let data = val.payload.doc.data() as iCart
            let id = val.payload.doc.id;
            return {id, data}
        })
    })
     .subscribe((carts)=>{
         this.cart$ = carts.filter(cat=> cat.data.postcode == this.storeService.retriveData('postcode'));
       })

    }
    checkOut(){
        if(this.sum > 40){
            if(this.currentUser){
              this._router.navigate(["/checkout"]);
            }else{
              this._router.navigate(["/login"]);
            }
        }else{
            this.checkoutMsg = "You need to spend £40 or more";
        }
        
    }
    removeCart(cart){
        this.cartService.removeCart(cart);
    }
    goBack(){
        this._location.back();
    }

    increment(product){
        this.cartService.incrementCart(product);
    //  this.store.dispatch({type: cart.INCREMENT, payload: this.payLoad(product)})
    }
    decrement(product, e){
        if(product.data.qty == 1){
            e.target.innerHTML = "pan_tool";
            e.target.style.color = "red";
            return;
        //    this.cartService.removeCart(this.payLoad(product));
        }else{
            this.cartService.decrementCart(product);
        }
  
    //  this.store.dispatch({type: cart.DECREMENT, payload: this.payLoad(product)})
        
    }
//     private payLoad(product) {
//       return {
//         key$: product.$key,
//         name: product.name,
//         id: product.id,
//         price: product.price,
//         qty: product.qty
//       }
//    }
    ngOnInit(){
        this.authService.authState().subscribe(user=>{
            this.currentUser = user;
        });

        this.cartService.cartTotal().subscribe((carts)=>{
            let total = carts.filter(cart=> cart.postcode == this.storeService.retriveData('postcode'))
            .map(cart=>cart.qty * Number(cart.price));
             this.sum = total.reduce((sum, num)=>{return sum + num}, 0).toFixed(2);
            });
    }

}