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
    cart$:Observable<iCart>;
    document;
    toggle: boolean = false;
    constructor(private storeService:StorageService, private cartService:CartService,
        private windowService: WindowService){
       this.document = windowService.getDocumentRef();
       this.cartService.getCart().subscribe((carts)=>{
        
         this.cart$ = carts.filter(cat=> cat.postcode == this.storeService.retriveData('postcode'));
        //  console.log();
        if((_.size(carts.filter(cat=> cat.postcode == this.storeService.retriveData('postcode')))) > 4){
            this.toggle = true;
        }else{
            this.toggle = false;
        }
         
       })
    }
    // [@cartList]="cart$.length"
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

   private payLoad(product) {
      return {
        key$: product.$key,
        name: product.name,
        id: product.id,
        price: product.price,
        qty: product.qty
      }
   }
   ngOnInit(){
       
   }

}