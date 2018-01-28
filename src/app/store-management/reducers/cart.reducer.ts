import { Action, ActionReducer }    from '@ngrx/store';
import * as cartActions             from '../actions/cart.action';
import { Cart }                     from '../models/cart.model';
import { Observable }               from 'rxjs/Observable';
import { of }                       from 'rxjs/Observable/of';


export type Actions = cartActions.All;

const newState = (state, newData) => {
    // console.log(newData);
    return [...state, newData];
}

const loadOne = {
    name: "Mango",
    product_id: "478599373",
    imageUrl: "image.png",
    price: "3.50",
    pid: "1",
    qty: 2
}
const INITIALState: Cart[] = [
    // loadOne
]

export function CartReducer<ActionReducer>(state: Cart[] = INITIALState, action: Actions): Cart[]{
    switch(action.type){
        case cartActions.INITIAL_STATE:
            let payL = action.payload;
            let intData = state.filter(cart => cart.pid !== payL.pid);
            return [...intData, action.payload];

        case cartActions.CREATE_SUCCESS:
            let cartPay = action.payload;
            let newstate = state.filter(cart => cart.pid !== cartPay.pid);
            return [...newstate, action.payload];

        case cartActions.UPDATE_SUCCESS:
            let updatedCart = action.payload;
            if(updatedCart.qty < 1){
                let oldState = state.filter(cart => cart.pid !== updatedCart.pid);
                return [...oldState];
            }else{
                let oldState = state.filter(cart => cart.pid !== updatedCart.pid);
            
                return [...oldState, action.payload];
            }

        case cartActions.DELETE_SUCCESS:
            let paylod = action.payload;
            let oneCart = state.find(cat => {
                return cat.pid == paylod.pid
            })
            let newStat = state.filter(cart => cart.pid !== oneCart.pid);
            return [...newStat]
        default: 
            return state;
    }
}



