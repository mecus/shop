import { Component, OnInit } from '@angular/core';
import { trigger, state, style, stagger, transition, animate, keyframes, query } from '@angular/animations';
import { iCart } from "../../../models/cart.model";
import { Observable } from "rxjs/Observable";
import { CartService } from '../../../services/cart.service';
import { StorageService } from "../../../services/storage.service";
import { WindowService } from '../../../services/window.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import * as _ from 'lodash';
import { Store } from '@ngrx/store';
import * as cartActions from '../../../store-management/actions/cart.action';
import { Cart } from '../../../store-management/models/cart.model';
import { DbService } from '../../../services/db.service';


@Component({
    selector: 'side-shop-cart',
    templateUrl: 'carts/cart.side.component.html',
    styleUrls: ['carts/cart.side.component.scss'],

    animations: [
        trigger('loadCart', [
            transition('* => *', [
                query('.colC', style({opacity:0, transform: 'translateX(-40px)'})),

                query('.colC', stagger('500ms', [
                    animate('500ms .5s ease-out', style({opacity:1, transform: 'translateX(0)'}))
                ])),
            ])
        ]),
        // trigger('cartList', [
        //     transition('* => *', [ 
        //         query(':enter', style({opacity: 0}), {optional: true}),

        //         query(':enter', stagger('300ms', [
        //             animate('.7s ease-in', keyframes([
        //                 style({opacity: 0, transform: 'translateY(-70px)', offset: 0}),
        //                 style({opacity: 0.5, transform: 'translateY(30px)', offset: 0.3}),
        //                 style({opacity: 1, transform: 'translateY(0)', offset: 1})
        //             ]))
        //         ]), {optional: true}),

        //         query(':leave', stagger('300ms', [
        //             animate('.7s ease-in', keyframes([
        //                 style({opacity: 1, transform: 'translateY(0)', offset: 0}),
        //                 style({opacity: 0.7, transform: 'translateY(30px)', offset: 0.3}),
        //                 style({opacity: 0.4, transform: 'translateX(-50px)', offset: 0.2}),
        //                 style({opacity: 0, transform: 'translateX(200px)', offset: 1}),
        //                 // style({opacity: 0, transform: 'translateY(-70px)', offset: 1})
        //             ]))
        //         ]), {optional: true})
        //     ])
           
        // ])
    ]

})
export class SideCartComponent implements OnInit {
    cart$;
    document;
    toggle: boolean = false;
    constructor(
        private storeService:StorageService, 
        private cartService:CartService,
        private windowService: WindowService,
        private db: DbService,
        private store: Store<any>
        ){
       this.document = windowService.getDocumentRef();
        store.select('cart').subscribe((cart: Cart[]) => {
            this.cart$ = cart;
            if(cart.length > 4){
                this.toggle = true;
            }else{
                this.toggle = false;
            }
        });
    }
    private payLoad(product) {
        return {
          name: product.name,
          id: product.id,
          pid: product.pid,
          price: product.price,
          qty: product.qty
        }
     }

    removeItem(product){
        this.store.dispatch({type: cartActions.DELETE, payload: this.payLoad(product)})
    }
    increment(product){
        // console.log(product);
        this.store.dispatch({type: cartActions.UPDATE, payload: {...this.payLoad(product), do: 'increment'}});
    }
    decrement(product){ 
        this.store.dispatch({type: cartActions.UPDATE, payload: {...this.payLoad(product), do: 'decrement'}});   
    }
    seeMoreCart(){
        let domE = this.document.querySelector('.jumbotron-clone');
        let more = this.document.querySelector('#more');
        let less = this.document.querySelector('#less');
        less.style.display = "block";
        domE.style.maxHeight = "100%";
        more.style.display = "none";
        
    }
    seeLessCart(){
        let domE = this.document.querySelector('.jumbotron-clone');
        let more = this.document.querySelector('#more');
        let less = this.document.querySelector('#less');
        less.style.display = "none";
        domE.style.maxHeight = "200px";
        more.style.display = "block";
    }


   ngOnInit(){
       
   }

}