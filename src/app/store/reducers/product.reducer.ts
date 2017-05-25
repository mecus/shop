import { State, Action, ActionReducer } from '@ngrx/store';
import { iProduct } from "app/models/product.model";
import * as product from "../../store/actions/product.action";

// import { InitialProduct } from '../app-store';


export const products:ActionReducer<any[]> = (state=[], action:Action)=>{

    switch(action.type){
        case product.LOAD_PRODUCT:{
            return state;
        }
        
         case product.LOAD_PRODUCT_SUCCESS:{
            return state.concat(action.payload);
        }
        case product.NEW_PRODUCT:{
           return state;
            // return [...state, action.payload];
        }
        case product.NEW_PRODUCT_SUCCESS:{
            return [...state, action.payload];
            // return Object.assign({}, action.payload)
        }
        case product.REMOVE_PRODUCT:{
            const product = state.find((prod)=> prod.id == action.payload.id)
            return state.pop();
        }
        case product.VIEW_PRODUCT:{

        }

        default:{
            return state;
        }
    }

}