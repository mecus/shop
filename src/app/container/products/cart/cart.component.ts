import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { iCart } from "../../../models/cart.model";
import { Observable } from "rxjs/Observable";

@Component({
    selector: 'shop-cart',
    template: `
    
       <div class="container">
            <p>Your Cart</p>
            <li *ngFor="let cat of cart$ | async">
                <p>{{cat.name}} <span>{{cat.qty}}</span></p>
                <span>{{cat.price | currency : 'GBP' :true}}</span>
            </li>
       </div>

    `,
    styles: ['']
})
export class CartComponent {
    cart$:Observable<iCart>;
    constructor(private store:Store<iCart>){
       this.cart$ = this.store.select('cartReducer');
    //    console.log(this.cart$);
    }

}