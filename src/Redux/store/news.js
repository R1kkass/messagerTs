const initialState = {
    news: [],
    likes: [],
    comment: []
}

export const ADD_NEWS = 'ADD_NEWS'
export const ASYNC_ADD_NEWS = 'ASYNC_ADD_NEWS'

export const newsReducer = (state=initialState, action)=>{
    switch (action.type){
        case ADD_NEWS:
            return {...state, news: action.news.feed, likes: action.news.likes, comment: action.news.comment}
        default:
            return state
    }
}

export const newsAction = (payload) =>({type: ADD_NEWS, news: payload})
export const asyncNewsAction = (payload, limit) =>{
    return {type: ASYNC_ADD_NEWS, payload: [payload, limit]}
}
