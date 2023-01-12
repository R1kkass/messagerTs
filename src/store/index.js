import { counterReducer } from "./counter";
import { messageReducer } from "./message";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { authReducer } from "./auth";
import {composeWithDevTools} from 'redux-devtools-extension'
import { tokenReducer } from "./token";
import createSagaMiddleware from "@redux-saga/core";
import { rootWatcher } from "../saga";
import { chatReducer } from "./chat";
import { mainReducer } from "./main";
import { newsReducer } from "./news";
import { commentReducer } from "./comment";

const sagaMiddleware = createSagaMiddleware()

const rootReducers = combineReducers({
    counter: counterReducer,
    messages: messageReducer,
    auth: authReducer,
    token: tokenReducer,
    chat: chatReducer,
    mainInfo: mainReducer,
    news: newsReducer,
    comment: commentReducer
})

export const store = createStore(rootReducers, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(rootWatcher)