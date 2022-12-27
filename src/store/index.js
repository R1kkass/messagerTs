import { counterReducer } from "./counter";
import { messageReducer } from "./message";
import { combineReducers, createStore } from "redux";
import { authReducer } from "./auth";
import {composeWithDevTools} from 'redux-devtools-extension'

const rootReducers =combineReducers({
    counter: counterReducer,
    messages: messageReducer,
    auth: authReducer
})

export const store = createStore(rootReducers, composeWithDevTools())