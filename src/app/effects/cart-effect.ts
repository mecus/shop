import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toArray';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Database } from '@ngrx/db';
import { Observable } from 'rxjs/Observable';
import { defer } from 'rxjs/observable/defer';
import { of } from 'rxjs/observable/of';
import { CartService } from '../services/cart.service';
import { iCart } from '../models/cart.model';
import * as cart from '../store/actions/cart.action';


@Injectable()
export class CartEffects {

    @Effect({ dispatch: false })
    openDB$: Observable<any> = defer(() => {
        return this.db.open('shop-app');
    });

    // @Effect() createCart$:Observable<Action> = this.action$
    //     .ofType(cart.ADD)
    //     .map(toPayload)
    //     .switchMap((payload)=> 
    //         this.cartService.createCart(payload)
    //             .switchMap(res=>{
    //             console.log(res);
    //             // Observable.of({type: cart.ADD_SUCCESS, payload})
    //         })
    //     )
    // @Effect() loadCart$:Observable<Action> = this.action$
    //     .ofType(cart.LOAD_CART)
    //     .switchMap(()=>
    //         this.cartService.getCart()
    //             .switchMap(cart=>
    //                 Observable.of({type:cart.LOAD_CART_SUCCESS, payload: cart})
    //             )
    //     )


    constructor(private db:Database, private action$:Actions, private cartService:CartService){}
}