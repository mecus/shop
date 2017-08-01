import { Component, OnInit } from '@angular/core';
import { trigger, state, style, stagger, transition, animate, keyframes, query } from '@angular/animations';
import { Store } from '@ngrx/store';
import { iCart } from "../../../models/cart.model";
import { Observable } from "rxjs/Observable";
import * as cart from "../../../store/actions/cart-action";
import { CartService } from '../../../services/cart.service';
import { StorageService } from "app/services/storage.service";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';



@Component({
    selector: 'side-shop-cart',
    template: `
       <div class="container jumbotron-clone" *ngIf="cart$" [@cartList]="cart$.length">
            
            <div *ngFor="let cat of cart$" class="colC">
                <div class="row cart-list">
                    <div class="col col-xs-6 col-lg-6">
                        <p>{{cat.name}}</p>
                    </div>
                    <div class="col col-xs-3 col-lg-3">
                        <p>qty: {{cat.qty}}</p>
                    </div>
                    <div class="col col-xs-3 col-lg-3">
                        <p>{{cat.qty * cat.price | currency : 'GBP' :true}}</p>
                    </div>
                    <div class="row cart-info">
                        <div class=""col col-lg-4>
                            <img [src]="cat.imageUrl" [style.width.px]="50" alt="prod-image">
                        </div>
                        <div class=""col col-lg-4>
                            <div class="row qty-control">
                                <div class="col col-xs-4 dec" (click)="decrement(cat)">-</div>

                                <div class="col col-xs-4 inc" (click)="increment(cat)">+</div>
                            </div>
                        </div>
                        <div class=""col col-lg-4>
                            <p (click)="removeItem(cat)"><md-icon>delete</md-icon>Remove</p>
                        </div>
                    </div>
                    
                </div>
                
            </div>
       </div>

    `,
    styles: [`
        .row, col{
            margin:0px;
            padding:0px;
        }
        div.jumbotron-clone{ 
            
            margin: 0px;
            padding:0px;
            
        }
        div.cart-list{
            padding: 0px 5px;
            background-color: lightgrey;
        }
        div.cart-list p{
            font-size: 11px;
        }
        p.cart-head{
            width:100%;
            padding: 5px 10px;
            color:#fff;
            font-weight: bold;
        }
        .cart-head{
            
            background-color:slategray;
        }
        div.qty-control{
            padding: 5px;
        }
        div.qty-control .inc{
            background-color: slategrey;
            border-radius: 5px;
            margin: 2px;
            color: #fff;
        }
        div.qty-control .num{
            background-color: #fff;
            text-align: center;
        }
        div.qty-control .dec{
            background-color: slategrey;
            border-radius: 5px;
            margin: 2px;
            color: #fff;
        }
       
        div.cart-info img{
            padding: 5px;
            border-radius: 5px;
        }
    `],
    animations: [
        trigger('loadCart', [
            transition('* => *', [
                query('.colC', style({opacity:0, transform: 'translateX(-40px)'})),

                query('.colC', stagger('500ms', [
                    animate('500ms .5s ease-out', style({opacity:1, transform: 'translateX(0)'}))
                ])),
            ])
        ]),
        trigger('cartList', [
            transition('* => *', [ 
                query(':enter', style({opacity: 0}), {optional: true}),

                query(':enter', stagger('300ms', [
                    animate('.7s ease-in', keyframes([
                        style({opacity: 0, transform: 'translateY(-70px)', offset: 0}),
                        style({opacity: 0.5, transform: 'translateY(30px)', offset: 0.3}),
                        style({opacity: 1, transform: 'translateY(0)', offset: 1})
                    ]))
                ]), {optional: true}),

                query(':leave', stagger('300ms', [
                    animate('.7s ease-in', keyframes([
                        style({opacity: 1, transform: 'translateY(0)', offset: 0}),
                        style({opacity: 0.7, transform: 'translateY(30px)', offset: 0.3}),
                        style({opacity: 0.4, transform: 'translateX(-50px)', offset: 0.2}),
                        style({opacity: 0, transform: 'translateX(200px)', offset: 1}),
                        // style({opacity: 0, transform: 'translateY(-70px)', offset: 1})
                    ]))
                ]), {optional: true})
            ])
           
        ])
    ]

})
export class SideCartComponent implements OnInit {
    cart$:Observable<iCart>;
    constructor(private storeService:StorageService , private store:Store<iCart>, private cartService:CartService){
       
       cartService.getCart().subscribe((carts)=>{
           console.log(carts);
         this.cart$ = carts.filter(cat=> cat.postcode == this.storeService.retriveData('postcode'));
       })
    }

    removeItem(product){
        this.cartService.removeCart(this.payLoad(product));
    //  this.store.dispatch({type: cart.REMOVE, payload: this.payLoad(product)})
    }
    increment(product){
        this.cartService.incrementCart(this.payLoad(product));
    //  this.store.dispatch({type: cart.INCREMENT, payload: this.payLoad(product)})
    }
    decrement(product){
        if(product.qty < 1){
           this.cartService.removeCart(this.payLoad(product));
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
   ngOnInit(){}

}