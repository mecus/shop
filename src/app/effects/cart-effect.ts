import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toArray';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Database } from '@ngrx/db';
import { Observable } from 'rxjs/Observable';
import { defer } from 'rxjs/observable/defer';
import { of } from 'rxjs/observable/of';


@Injectable()
export class CartEffects {

    @Effect({ dispatch: false })
    openDB$: Observable<any> = defer(() => {
        return this.db.open('shop-app');
    });

    // @Effect() cart$:Observable<Action> = this.action$
    //     .ofType('')
        


    constructor(private db:Database, private action$:Actions){}
}