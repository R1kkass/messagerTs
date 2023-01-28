
const initialState ={
    sub:[],
    ur: []
}

export const ADD_SUB = 'ADD_SUB'
export const ASYNC_ADD_SUB = 'ASYNC_ADD_SUB'
export const ADD_UR = "ADD_UR"
export const ASYNC_ADD_UR = "ASYNC_ADD_UR"

export const subReducer = (state=initialState, action)=>{
    switch (action.type){
        case ADD_SUB:
            return {...state, sub: action.sub.data.subs}
        case ADD_UR:
            console.log(action.sub.data.subss[0]);
            return {...state, ur: action.sub.data.subss[0]} 
        default:
            return state
    }
}

export const subAction = (payload)=>({type: ADD_SUB, sub: payload})
export const subsAction = (payload)=>({type: ADD_UR, sub: payload})

export const asyncSubAction = (payload)=>({type: ASYNC_ADD_SUB, sub: payload})
export const asyncSubsAction = (payload)=>({type: ASYNC_ADD_UR, sub: payload})