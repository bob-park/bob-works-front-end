import { call, all, takeLatest, fork, put, delay } from 'redux-saga/effects';

import { get } from '@/utils/common';
import { authenticationActions } from '.';

const { requestGetUser, successGetUser, removeAuthentication } =
  authenticationActions;

function* callGetUser(action: ReturnType<typeof requestGetUser>) {
  const { exceptionHandle } = action.payload;

  try {
    const user: User = yield call(get, '/api/user', null);
    yield put(successGetUser(user));
  } catch (err) {
    // yield put(removeAuthentication());

    exceptionHandle && exceptionHandle();
  }

  // yield delay(2_000);
}

function* watchLoggedIn() {
  yield takeLatest(requestGetUser, callGetUser);
}

export default function* authencationSagas() {
  yield all([fork(watchLoggedIn)]);
}
