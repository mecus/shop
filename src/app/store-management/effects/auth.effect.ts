import { Injectable } from '@angular/core';
import { Effect, Actions }      from '@ngrx/effects';
import { Observable }           from 'rxjs/Observable';
import { of }                   from 'rxjs/Observable/of';
import { DbService }            from '../../services/db.service';
import * as authActions from '../actions/auth.action';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/delay';
import { Auth } from '../models/auth.model';

export type Action = authActions.All;

@Injectable()

export class AuthEffect {
    constructor(private action$: Actions, private db: DbService){}

    @Effect() $login: Observable<Action> = this.action$.ofType(authActions.LOGIN)
    .map((action: any) => action.payload)
    .mergeMap(payload => this.db.createUserSession(payload))
    .map((user: Auth) => {
        return new authActions.loginSuccess(user);
    })
    @Effect() $logout: Observable<Action> = this.action$.ofType(authActions.LOGOUT)
    .map((action: any) => action.payload)
    .mergeMap(payload => this.db.clearUserSession())
    .map((status:any) => {
        let paylod = {
            uid: null,
            type: status,
            displayName: null,
            photoURL: null,
            email: null,
            phone: null,
            status: "USER SIGN OUT",
            timeIn: null,
            timeOut: null,
            token: null,
            id: null,
            who: null,
            emailVerified: false
        }
        return new authActions.logoutSuccess(paylod);
    })
}