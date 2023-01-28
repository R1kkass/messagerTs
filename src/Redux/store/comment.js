const initalState = {
    comment:[]
}

export const ADD_COMMENT = 'ADD_COMMENT'
export const ASYNC_ADD_COMMENT = 'ASYNC_ADD_COMMENT'

export const commentReducer = (state=initalState, action)=>{
    switch (action.type){
        case ADD_COMMENT:
            return {...state, comment: action.comment}
        default:
            return state
    }
}

export const actionComment = (payload)=>({type: ADD_COMMENT, cooment: payload})
export const asyncActionComment = ()=>({type: ASYNC_ADD_COMMENT})
