const initalState = {
    feed: [],
}

export const ADD_FEED = 'ADD_FEED' 
export const ASYNC_ADD_FEED = 'ASYNC_ADD_FEED'


export const feedReducer = (state=initalState, action)=>{
    switch (action.type){
        case ADD_FEED:
            return {...state, feed: action.feed}
        default:
            return state
    }
}

export const feedAction = (payload)=>({type: ADD_FEED, feed: payload})
export const asyncFeedAction = (formData)=>({type: ASYNC_ADD_FEED, formData})