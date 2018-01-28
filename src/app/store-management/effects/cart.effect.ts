import { Injectable } from '@angular/core';
import { Effect, Actions }      from '@ngrx/effects';
// import { Action }               from '@ngrx/store';
import { Observable }           from 'rxjs/Observable';
import { of }                   from 'rxjs/Observable/of';
import { DbService }            from '../../services/db.service';
import * as CartActions from '../actions/cart.action';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/delay';
import { Cart } from '../models/cart.model';

export type Action = CartActions.All;

@Injectable()
export class CartEffects {
    constructor(private action$: Actions, private db: DbService){}
    
    @Effect() createCart$: Observable<Action> = this.action$.ofType(CartActions.CREATE)
    .map((action: CartActions.createOne) => action.payload)
    .mergeMap(payload => this.db.createCart(payload))
    .map((newCart: Cart) => {
        // console.log(newArray);
        return new CartActions.createOneSuccess(newCart);
    })
    @Effect() removeCart$: Observable<Action> = this.action$.ofType(CartActions.DELETE)
    .map((action: CartActions.deleteOne) => action.payload)
    .mergeMap(payload => this.db.removeCart(payload))
    .map((deletedCart: Cart) => {
        return new CartActions.deleteOneSuccess(deletedCart);
    })
    @Effect() updateCart$: Observable<Action> = this.action$.ofType(CartActions.UPDATE)
    .map((action: CartActions.updateOne) => action.payload)
    .mergeMap(payload => this.db.updatedCart(payload))
    .map((updatedCart: Cart) => {
        return new CartActions.updateOneSuccess(updatedCart);
    })

}