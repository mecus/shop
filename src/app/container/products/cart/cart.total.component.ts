import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { iCart } from "../../../models/cart.model";
import { Observable } from "rxjs/Observable";
// import { Database } from '@ngrx/db';
import { CartService } from '../../../services/cart.service';

@Component({
    selector: 'cart-total',
    template: `
    
            <span>{{sum | currency: "GBP" :true}}</span>
           
    `,
    styles: ['']
})
export class CartTotalComponent implements OnInit {
    cart$:Observable<iCart>;
    sum;
    total;

    constructor(private store:Store<iCart>, private cartService:CartService){
        
       
    }
    ngOnInit(){
        // this.getCartTotal();
    }

    
    //  getCartTotal(){
    //     this.cartService.cartTotal().subscribe((carts)=>{
    //        this.total = carts.map((cart) => {
    //            return cart.price * cart.qty   
    //         });
    //         this.sum = this.total.reduce(this.reducer, 0);
    //     })
    // }

    reducer(sum, num){
        return sum + num;
    }

}