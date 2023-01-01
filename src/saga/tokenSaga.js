import { check } from "../components/Layout/LayoutService";
import {put,call,takeEvery} from "redux-saga/effects"
import jwtDecode from "jwt-decode";

function* tokenWorker(){
    const a = yield call(check)
    yield put({type: 'EDIT_TOKEN', token: jwtDecode(localStorage.getItem('token')) })
}

export function* tokenWatcher(){
    yield takeEvery("ASYNC_EDIT", tokenWorker)
}