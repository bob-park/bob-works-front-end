// saga

import { call, all, takeLatest, fork, put } from 'redux-saga/effects';

import { client, get } from '@/utils/common';
import { authenticationActions } from '.';

const { requestGetUser, successGetUser } = authenticationActions;

function* callGetUser(action: ReturnType<typeof requestGetUser>) {
  const user: User = yield call(
    get,
    '/api/user',
    action.payload.exceptionHandle,
  );

  yield put(successGetUser(user));
}

function* watchLoggedIn() {
  yield takeLatest(requestGetUser, callGetUser);
}

export default function* authencationSagas() {
  yield all([fork(watchLoggedIn)]);
}
