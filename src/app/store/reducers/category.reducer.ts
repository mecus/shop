import { Action } from "@ngrx/store";
import * as cat  from "app/store/actions/category.action";



export interface state {
    cat: string;
    id: string;
}
export const InitialState =[
    
]
export const category = (state:state[]=InitialState, action:Action)=>{
    switch(action.type){
        case cat.SEARCH_CAT:{
            return state;
        }
        case cat.SEARCH_CAT_SUCCESS:{
            return state.concat([action.payload]);
            
            // if(state.indexOf(action.payload.id)){
            //     const id = action.payload.id
            //     return Object.assign(state.indexOf(id), action.payload);
            // }else{
            //     return state.concat([action.payload]);
            // }
            // return Object.assign({}, action.payload);
        }
        default:{
            return state;
        }
    }
}