import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { iCart } from "app/models/cart.model";
import { Observable } from "rxjs/Observable";
import * as cart from "app/store/actions/cart.action";

@Component({
    selector: 'side-shop-cart',
    template: `
    
       <div class="container" *ngIf="cart$">
            <p>Your Basket</p>
            <li *ngFor="let cat of cart$ | async">
                <p>Name: {{cat.name}} <span>Qty: {{cat.qty}}</span></p>
                <span>Price: {{cat.price | currency : 'GBP' :true}}</span>
                <md-card-actions>
                    <button (click)="increment(cat)" md-raised-button>+</button>
                    <button (click)="removeItem(cat)" color="accent" md-raised-button>Remove</button>
                    <button (click)="decrement(cat)"  md-raised-button>-</button>
                </md-card-actions>
            </li>
       </div>

    `,
    styles: ['']
})
export class SideCartComponent {
    cart$:Observable<iCart>;
    constructor(private store:Store<iCart>){
       this.cart$ = this.store.select('cartReducer');
       console.log(this.cart$);
    }

    removeItem(product){
     this.store.dispatch({type: cart.REMOVE, payload: this.payLoad(product)})
    }
    increment(product){
     this.store.dispatch({type: cart.INCREMENT, payload: this.payLoad(product)})
    }
    decrement(product){
     this.store.dispatch({type: cart.DECREMENT, payload: this.payLoad(product)})
    }


   private payLoad(product) {
      return {
        name: product.name,
         id: product.id,
         price: product.price,
         qty: '1'
      }
   }

}