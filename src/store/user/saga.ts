import { call, all, takeLatest, fork, put, delay } from 'redux-saga/effects';

import { get } from '@/utils/common';

import { userActions } from '.';

const {
  // get user vacation
  requestGetUserVacation,
  successGetUserVacation,
} = userActions;

// get user vacation
function* callGetUserVacation(
  action: ReturnType<typeof requestGetUserVacation>,
) {
  const user: User = yield call(get, '/api/user/vacation', null, () => {});

  yield put(successGetUserVacation(user));
}

function* watchRequestGetUserVacation() {
  yield takeLatest(requestGetUserVacation, callGetUserVacation);
}

export default function* userSagas() {
  yield all([fork(watchRequestGetUserVacation)]);
}
