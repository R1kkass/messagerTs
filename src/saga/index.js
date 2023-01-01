import { all } from "redux-saga/effects";
import { chatWatcher } from "./chatSaga";
import { tokenWatcher } from "./tokenSaga";

export function* rootWatcher(){
    yield all([tokenWatcher(), chatWatcher()])
}