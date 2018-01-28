import { Action, ActionReducer } from '@ngrx/store';
import { iShop } from '../models/shop.model';
import * as ShopActions from '../actions/shop.action';


export type Actions = ShopActions.All;


const InitialState = {
    dept_id: "paQgsupTTNSl967fo1Tp",
    aisle_id: null,
    cat_id: null,
    product_id: null,
    loading: null,
    offer: null
}
const newState = (state, newData, status?) => {
    return {...state, ...newData, ...status}
    // return Object.assign({}, state, newData);
}

export function shopReducer<ActionReducer>(state: iShop = InitialState, action: Actions){
    switch(action.type){
        case ShopActions.LOAD_SHOP:
            return newState(state, action.payload);
        // case ShopActions.LOAD_SHOP_SUCCESS:
        //     return newState(state, action.payload);
        case ShopActions.DEPARTMENT:
            return newState(state, {loading: true});
        case ShopActions.DEPARTMENT_SUCCESS:
            return newState(state, action.payload, {loading: false});
        case ShopActions.AISLE:
            return newState(state, {loading: true});
        case ShopActions.AISLE_SUCCESS:
            return newState(state, action.payload, {loading: false});

        case ShopActions.CATEGORY: 
            return newState(state, {loading: true});

        case ShopActions.CATEGORY_SUCCESS: 
            return newState(state, action.payload, {loading: false});

        case ShopActions.PRODUCT: 
            return newState(state, {loading: true});
        case ShopActions.PRODUCT_SUCCESS: 
            return newState(state, action.payload, {loading: false});
        case ShopActions.OFFER:
            return newState(state, {loading: true});
        case ShopActions.OFFER_SUCCESS:
            return newState(state, action.payload, {loading: false});
        default:
            return state;
    }

}