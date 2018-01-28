import { Action } from "@ngrx/store";
import { Auth } from "../models/auth.model";

export const AUTHLOAD = "[auth] AUTHLOAD";
export const LOGIN = "[auth] LOGIN";
export const LOGIN_SUCCESS = "[auth] LOGIN_SUCCESS";
export const LOGOUT = "[auth] LOGOUT";
export const LOGOUT_SUCCESS = "[auth] LOGOUT_SUCCESS";

export class authload implements Action {
    readonly type = AUTHLOAD;
    constructor(public payload: Auth){}
}
export class login implements Action {
    readonly type = LOGIN;
    constructor(public payload: Auth) {}
}
export class loginSuccess implements Action {
    readonly type = LOGIN_SUCCESS;
    constructor(public payload: Auth) {}
}
export class logout implements Action {
    readonly type = LOGOUT;
    constructor(public payload: Auth) {}
}
export class logoutSuccess implements Action {
    readonly type = LOGOUT_SUCCESS;
    constructor(public payload: Auth) {}
}

export type All = authload
                | login
                | loginSuccess
                | logout
                | logoutSuccess

