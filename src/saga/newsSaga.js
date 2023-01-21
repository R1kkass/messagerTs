const { fetchNews } = require("../Page/News/NewsService");
const { call, put, takeEvery } = require("redux-saga/effects");
const { newsAction, ASYNC_ADD_NEWS } = require("../store/news");

function* newsWorker(...args){
    const res = yield call(fetchNews, args[0], args[1])
    yield put(newsAction(res)) 
}

export function* newsWatcher(){
    yield takeEvery(ASYNC_ADD_NEWS, newsWorker)
}