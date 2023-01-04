import { call, put, takeEvery } from "redux-saga/effects"
import { mainAction } from "../store/main"


function* mainWorker(){
    const res = yield call(FetchOneUser())
    yield put(mainAction)
}

export function* mainWatcher(){
    takeEvery('ASYNC_ADD', mainWorker)
}