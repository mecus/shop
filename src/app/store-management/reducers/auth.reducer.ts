import { Action, ActionReducer } from '@ngrx/store';
import * as authActions from '../actions/auth.action';
import { Auth } from '../models/auth.model';

export type Actions = authActions.All;

const INITIALS = {
    uid: null,
    type: 'auth',
    displayName: null,
    photoURL: null,
    email: null,
    phone: null,
    status: "USER SIGNED OUT",
    timeIn: null,
    timeOut: null,
    token: null,
    id: null,
    who: null,
    emailVerified: false
}

export function authReducer<ActionReducer>(state: Auth = INITIALS, action: Actions){
    switch(action.type){
        case authActions.AUTHLOAD:
            return {...action.payload};
        case authActions.LOGIN_SUCCESS:
            return {...action.payload};
        case authActions.LOGOUT_SUCCESS:
            return {...action.payload};
        default: 
            return state;
    }
}