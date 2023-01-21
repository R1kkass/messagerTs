
const initialState ={
    sub:[]
}

export const ADD_SUB = 'ADD_SUB'
export const ASYNC_ADD_SUB = 'ASYNC_ADD_SUB'

export const subReducer = (state=initialState, action)=>{
    switch (action.type){
        case ADD_SUB:
            console.log(action);
            return {...state, sub: action.sub.data.device}
        default:
            return state
    }
}

export const subAction = (payload)=>({type: ADD_SUB, sub: payload})
export const asyncSubAction = (payload)=>({type: ASYNC_ADD_SUB, sub: payload})