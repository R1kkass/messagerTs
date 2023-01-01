
export const ADD_CHATS = "ADD_CHATS"
export const ASYNC_ADD_CHAT ='ASYNC_ADD_CHAT'

const initialState = {
    chats: []
}

export const chatReducer = (state=initialState, action)=>{
    switch (action.type){
        case 'ADD_CHATS':
            return {...state, chats: action.chat}
        default:
            return state
    }
}

export const chatAction = (payload)=>({type: ADD_CHATS, chat: payload})
export const asyncChatAction = (payload) =>({type: ASYNC_ADD_CHAT}) 
