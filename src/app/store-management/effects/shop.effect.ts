import { Injectable }           from '@angular/core';
import { Effect, Actions }      from '@ngrx/effects';
// import { Action }               from '@ngrx/store';
import { Observable }           from 'rxjs/Observable';
import { of }                   from 'rxjs/Observable/of';
import { DbService }            from '../../services/db.service';
import * as ShopActions from '../actions/shop.action';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/delay';

export type Action = ShopActions.All;


@Injectable()
export class ShopEffect {

    constructor(private action$: Actions, private db: DbService){}
    
    // @Effect() loadShop$: Observable<Action> = this.action$.ofType(ShopActions.LOAD_SHOP)
    //     .map((action: ShopActions.LoadShop) => action.payload)
    //     .mergeMap(payload => this.db.updateShopDatabase(payload))
    //     .map(shopState => {
    //         return new ShopActions.LoadShopSuccess(shopState);
    //     })
    @Effect() department$: Observable<Action> = this.action$.ofType(ShopActions.DEPARTMENT)
        .map((action: ShopActions.Department) => action.payload)
        // .delay(5000)
        .mergeMap(payload => this.db.updateShopDatabase({
            dept_id: payload,
            aisle_id: null,
            cat_id: null,
            product_id: null
        }))
        .map(shopState => {
            return new ShopActions.DepartmentSuccess(shopState);
        })
    @Effect() aisle$: Observable<Action> = this.action$.ofType(ShopActions.AISLE)
        .map((action: ShopActions.Aisle) => action.payload)
        .mergeMap(payload => this.db.updateShopDatabase({
            aisle_id: payload,
            cat_id: null,
            product_id: null
        }))
        .map(shopState => {
            return new ShopActions.AisleSuccess(shopState);
        })
    @Effect() category$: Observable<Action> = this.action$.ofType(ShopActions.CATEGORY)
        .map((action: ShopActions.Category) => action.payload)
        .mergeMap(payload => this.db.updateShopDatabase({
            cat_id: payload,
            product_id: null
        }))
        .map(shopState => {
            return new ShopActions.CategorySuccess(shopState);
        })
    @Effect() product$: Observable<Action> = this.action$.ofType(ShopActions.PRODUCT)
        .map((action: ShopActions.Product) => action.payload)
        .mergeMap(payload => this.db.updateShopDatabase({product_id: payload}))
        .map(shopState => {
            return new ShopActions.ProductSuccess(shopState);
        })
    @Effect() productOffer$: Observable<Action> = this.action$.ofType(ShopActions.OFFER)
        .map((action: ShopActions.Offer) => action.payload)
        .mergeMap(payload => this.db.updateShopDatabase({offer: payload}))
        .map(shopState => {
            console.log(shopState);
            return new ShopActions.OfferSuccess(shopState);
        })
}