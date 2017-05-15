import { Action } from "@ngrx/store";
import { iProduct } from "app/models/product.model";

export const LOAD_PRODUCT = '[iProduct] LOAD_PRODUCT';
export const LOAD_PRODUCT_SUCCESS = '[iProduct] LOAD_PRODUCT_SUCCESS';
export const NEW_PRODUCT = '[iProduct] NEW_PRODUCT';
export const NEW_PRODUCT_SUCCESS = '[iProduct] NEW_PRODUCT_SUCCESS';
export const NEW_PRODUCT_FAIL = '[iProduct] NEW_PRODUCT_FAIL';
export const REMOVE_PRODUCT = '[iProduct] REMOVE_PRODUCT';
export const VIEW_PRODUCT = '[iProduct] VIEW_PRODUCT';

export class loadproductsuccess implements Action {
    readonly type = LOAD_PRODUCT_SUCCESS;

    constructor(public payload: iProduct[] ){}
}

export class newproduct implements Action {
    readonly type = NEW_PRODUCT;

    constructor(public payload: iProduct ){}
}
export class newproductsuccess implements Action {
    readonly type = NEW_PRODUCT_SUCCESS;

    constructor(public payload:iProduct){}
}
export class newproductfail implements Action {
    readonly type = NEW_PRODUCT_FAIL;

    constructor(public payload:iProduct){}
}


export type Actions
        = newproduct
        | newproductsuccess;