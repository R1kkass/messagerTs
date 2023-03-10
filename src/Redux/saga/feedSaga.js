import { feedFetch } from "../../Page/Feed/FeedService";
import { fetchNews } from "../../Page/News/NewsService";
import { call, put, takeEvery } from "redux-saga/effects";
import { ASYNC_ADD_FEED, feedAction } from "../store/feed";
import { asyncNewsAction, newsAction } from "../store/news";


function* feedWorker(args){
    yield console.log(args);
    const res = yield call(feedFetch, args)
    yield put(feedAction(res))

}

export function* feedWatcher(){
    yield takeEvery(ASYNC_ADD_FEED, feedWorker)
}