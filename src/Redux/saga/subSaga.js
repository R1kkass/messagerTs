
import { allSub, allUrSub } from "components/LeftBlockMain/LeftBlockSevice";
import { ASYNC_ADD_SUB, ASYNC_ADD_UR, subAction, subsAction } from "../store/sub";

const { call, put, takeEvery } = require("redux-saga/effects");


function* subWorker(...args){
    
    const res = yield call(allSub, args[0].sub)
    yield put(subAction(res)) 
}

function* subsWorker(...args){
    
    const res = yield call(allUrSub, args[0].sub)
    console.log(res);
    yield put(subsAction(res))
}

export function* subWatcher(){
    yield takeEvery(ASYNC_ADD_SUB, subWorker)
    yield takeEvery(ASYNC_ADD_UR, subsWorker)
}