import { State, Action } from '@ngrx/store';
import * as cart from '../actions/cart.action';



export const cartReducer= (state=[], action:Action) => 
    {
        switch(action.type){
            case cart.ADD:{
                return [...state, action.payload];
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
                return state;
            }
            default:{
                return state
            }
        }
    }