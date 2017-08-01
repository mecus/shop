import { State, Action } from '@ngrx/store';


export const InitialState = [];


export function appState(state={}, action:Action)
    {
        switch(action.type){
            case 'ACTIVE' :{
                return action.payload;
            }
           
            default:{
                return state
            }
        }
    }