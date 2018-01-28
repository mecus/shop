import { Action } from '@ngrx/store';
import { Cart } from '../models/cart.model';

export const INITIAL_STATE = '[Cart] INITIAL_STATE';
export const CREATE = '[Cart] CREATE';
export const CREATE_SUCCESS = '[Cart] CREATE_SUCCESS';
export const UPDATE = '[Cart] UPDATE';
export const UPDATE_SUCCESS = '[Cart] UPDATE_SUCCESS';
export const DELETE = '[Cart] DELETE';
export const DELETE_SUCCESS = '[Cart] DELETE_SUCCESS';

export class initialSate implements Action {
    readonly type = INITIAL_STATE;
    constructor(public payload: Cart){}
}
export class createOne implements Action {
    readonly type = CREATE;
    constructor(public payload: Cart){}
}
export class createOneSuccess implements Action {
    readonly type = CREATE_SUCCESS;
    constructor(public payload: Cart){
        // console.log(payload);
    }
}
export class updateOne implements Action {
    readonly type = UPDATE;
    constructor(public payload: Cart){}
}
export class updateOneSuccess implements Action {
    readonly type = UPDATE_SUCCESS;
    constructor(public payload: Cart){}
}
export class deleteOne implements Action {
    readonly type = DELETE;
    constructor(public payload: Cart){}
}
export class deleteOneSuccess implements Action {
    readonly type = DELETE_SUCCESS;
    constructor(public payload: Cart){}
}

export type All = initialSate
                | createOne
                | createOneSuccess
                | updateOne
                | updateOneSuccess
                | deleteOne
                | deleteOneSuccess
                