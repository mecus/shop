import { State, Action } from '@ngrx/store';
import * as cart from '../actions/cart-action';


export const InitialState = [];


export const cartReducer= (state=InitialState, action:Action) => 
    {
        switch(action.type){
            case cart.ADD:{
                return state;
                // return state.concat(action.payload);
            }
            case cart.ADD_SUCCESS:{
                return state.concat(action.payload);
            }
            case cart.LOAD_CART_SUCCESS:{
                return state.concat(action.payload);
            }
            case cart.REMOVE:{
                const newstate = state.filter(cart=>{ return cart.id !== action.payload.id})
                return newstate;
            }
            case cart.INCREMENT:{
                let cart = state.find(cart=> cart.id == action.payload.id);
                cart.qty ++;
                return state;
            }
            case cart.DECREMENT:{
                let cart = state.find(cart=> cart.id == action.payload.id);
                cart.qty --;
                if(cart.qty < 1){
                    return state.filter(cart => { return cart.id !== action.payload.id})
                }
                return state;
            }
            default:{
                return state
            }
        }
    }