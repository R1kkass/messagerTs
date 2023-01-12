import { FetchOneUser } from "../Page/Main/MainService"
import { call, put, takeEvery } from "redux-saga/effects"
import { mainAction } from "../store/main"


function* mainWorker(){
    const res = yield call(FetchOneUser)
    yield put(mainAction(res))
}

export function* mainWatcher(){
    yield takeEvery('ASYNC_ADD', mainWorker)
}