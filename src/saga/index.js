import { all } from "redux-saga/effects";
import { chatWatcher } from "./chatSaga";
import { feedWatcher } from "./feedSaga";
import { mainWatcher } from "./mainSaga";
import { newsWatcher } from "./newsSaga";
import { subWatcher } from "./subSaga";
import { tokenWatcher } from "./tokenSaga";

export function* rootWatcher(){
    yield all([
        tokenWatcher(), 
        chatWatcher(), 
        mainWatcher(), 
        feedWatcher(),
        newsWatcher(),
        subWatcher()
    ])
}