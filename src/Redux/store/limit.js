

const initialState = {
    limit: 10
}

export const EDIT_LIMIT="EDIT_LIMIT"

export const limitReducer = (state=initialState, action)=>{
    switch (action.type){
        case EDIT_LIMIT:
            return {...state, limit: action.limit}
        default:
            return state
    }
}

export const limitAction = (payload)=>({type: EDIT_LIMIT, limit: payload})