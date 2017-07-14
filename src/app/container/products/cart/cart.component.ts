import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { iCart } from "../../../models/cart.model";
import { Observable } from "rxjs/Observable";
import { CartService } from '../../../services/cart.service';

@Component({
    selector: 'shop-cart',
    template: `
    
       <div class="container">
            <p>Your Cart: <span><cart-total></cart-total></span></p>
            
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
    constructor(private cartService:CartService){
       this.cart$ = this.cartService.getCart();
    //    console.log(this.cart$);
    }

}