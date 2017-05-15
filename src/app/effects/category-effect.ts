import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from "rxjs/Observable";
import * as cat from '../store/actions/category.action';
import { ProductService } from "app/services/product.service";
import { Response } from '@angular/http';
import { of } from "rxjs/observable/of";
import { Router } from '@angular/router';
import { empty } from "rxjs/Observable/empty";


@Injectable()

export class CategoryEffects {

    @Effect() $category:Observable<Action> = this.$action
        .ofType(cat.SEARCH_CAT)
        .map(toPayload)
        .switchMap( payload => {
            this.router(payload)
            if(payload){
               return Observable.of({type: cat.SEARCH_CAT_SUCCESS, payload});
            }
           
           
        })

    constructor(private $action:Actions,
    private productService:ProductService, private _router:Router){}

    router(payload){
        this._router.navigate(["/products/?", payload])
    }
}