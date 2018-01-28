import { shopReducer } from './shop.reducer';
import { CartReducer } from './cart.reducer';
import { ActionReducerMap } from '@ngrx/store'
import { authReducer } from './auth.reducer';

export const Reducers: ActionReducerMap<any> = {
    shop: shopReducer,
    cart: CartReducer,
    auth: authReducer
}