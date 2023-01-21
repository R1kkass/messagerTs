
import { allSub } from "components/LeftBlockMain/LeftBlockSevice";
import { ASYNC_ADD_SUB, subAction } from "../store/sub";

const { call, put, takeEvery } = require("redux-saga/effects");


function* subWorker(...args){
    
    const res = yield call(allSub, args[0].sub)
    yield console.log(res);
    yield put(subAction(res)) 
}

export function* subWatcher(){
    yield takeEvery(ASYNC_ADD_SUB, subWorker)
}