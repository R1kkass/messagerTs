import {createStore} from "redux"

const defaultState = {
    count: 1,
    messages: []
}

export const messageReducer = (state = defaultState, action) =>{
    switch (action.type){
        case "SEND":
            return {...state, messages: action.action || []}
        case "COUNT":
            return {...state, count: action.action}
        default:
            return state
    }
}
