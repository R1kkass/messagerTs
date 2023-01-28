import { call, put, takeEvery } from "redux-saga/effects";
import { fetchChat } from "../../components/ListChat/ListChatService";
import { ASYNC_ADD_CHAT, chatAction } from "../store/chat";


function* chatWorker(){
    const res = yield call(fetchChat)
    yield put(chatAction(res))
}

export function* chatWatcher(){
    yield takeEvery(ASYNC_ADD_CHAT, chatWorker)
}