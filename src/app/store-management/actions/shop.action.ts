import { Action } from "@ngrx/store";
import { iShop } from "../models/shop.model";

export const LOAD_SHOP = 'LOAD_SHOP';
export const LOAD_SHOP_SUCCESS = 'LOAD_SHOP_SUCCESS';
export const DEPARTMENT = 'DEPARTMENT';
export const DEPARTMENT_SUCCESS = 'DEPARTMENT_SUCCESS';
export const AISLE = 'AISLE';
export const AISLE_SUCCESS = 'AISLE_SUCCESS';
export const CATEGORY = 'CATEGORY';
export const CATEGORY_SUCCESS = 'CATEGORY_SUCCESS';
export const PRODUCT = 'PRODUCT';
export const PRODUCT_SUCCESS = 'PRODUCT_SUCCESS';
export const OFFER = 'OFFER';
export const OFFER_SUCCESS = 'OFFER_SUCCESS';


export class LoadShop implements Action {
    readonly type = LOAD_SHOP;
    constructor(public payload: iShop){}
}
export class LoadShopSuccess implements Action {
    readonly type = LOAD_SHOP_SUCCESS;
    constructor(public payload: iShop){}
}
export class Department implements Action {
    readonly type = DEPARTMENT;
    constructor(public payload: iShop){}
}
export class DepartmentSuccess implements Action {
    readonly type = DEPARTMENT_SUCCESS;
    constructor(public payload: iShop){}
}
export class Aisle implements Action {
    readonly type = AISLE;
    constructor(public payload: iShop){}
}
export class AisleSuccess implements Action {
    readonly type = AISLE_SUCCESS;
    constructor(public payload: iShop){}
}
export class Category implements Action {
    readonly type = CATEGORY;
    constructor(public payload: iShop){}
}
export class CategorySuccess implements Action {
    readonly type = CATEGORY_SUCCESS;
    constructor(public payload: iShop){}
}
export class Product implements Action {
    readonly type = PRODUCT;
    constructor(public payload: iShop){}
}
export class ProductSuccess implements Action {
    readonly type = PRODUCT_SUCCESS;
    constructor(public payload: iShop){}
}
export class Offer implements Action {
    readonly type = OFFER;
    constructor(public payload: iShop){}
}
export class OfferSuccess implements Action {
    readonly type = OFFER_SUCCESS;
    constructor(public payload: iShop){}
}

export type All 
    = LoadShop
    | LoadShopSuccess
    | Department
    | DepartmentSuccess
    | Aisle
    | AisleSuccess
    | Category
    | CategorySuccess
    | Product
    | ProductSuccess
    | Offer
    | OfferSuccess