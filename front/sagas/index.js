import { all, fork } from 'redux-saga/effects';
import axios from 'axios';

import postSage from './post';
import userSaga from './user';

// call - 동기, fork - 비동기
// takeLatest - 응답을 취소. 요청은 취소 x
// throttle - 몇 초 동안은 한번의 요청만 가능하도록

axios.defaults.baseURL = 'http://localhost:3055';
axios.defaults.withCredentials = true; // 쿠키 주고받기

export default function* rootSaga() {
  yield all([
    fork(postSage),
    fork(userSaga),
  ]);
}
