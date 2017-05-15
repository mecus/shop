import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from "rxjs/Observable";
import { iProduct } from "app/models/product.model";
import { ProductService } from "app/services/product.service";
import { Response } from '@angular/http';
import * as product from '../store/actions/product.action';
import { of } from "rxjs/observable/of";
import { Router } from '@angular/router';


@Injectable()

export class ProductEffects {

    @Effect() $loadproduct:Observable<Action> = this.$action
        .ofType(product.LOAD_PRODUCT)
        .switchMap(() =>
            this.productService.getProducts()
                .switchMap((product)=>
                //Need to Fix the data types
                Observable.of({type: 'LOAD_PRODUCT_SUCCESS', payload: product})
                )
            
                
        )

    @Effect() $saveproduct:Observable<Action> = this.$action
        .ofType(product.NEW_PRODUCT)
        .map(toPayload)
        .switchMap((payload)=>
            this.productService.createProduct(payload)
            .switchMap((res)=> {
                console.log(res);
                Observable.of({type: product.NEW_PRODUCT_SUCCESS, payload})
            }
            )
        )

    constructor(private $action:Actions, 
    private productService:ProductService, private _router:Router){}

}

