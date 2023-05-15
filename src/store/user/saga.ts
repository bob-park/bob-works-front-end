import { call, all, takeLatest, fork, put, delay } from 'redux-saga/effects';

import { get, putCall, post } from '@/utils/common';

import { userActions } from '.';

const {
  // get user vacation
  requestGetUserVacation,
  successGetUserVacation,
  //update password
  requestUpdatePassword,
  successUpdatePassword,
  // update user avatar
  requestUpdateAvatar,
  successUpdateAvatar,
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

// update password
function* callUpdatePassword(action: ReturnType<typeof requestUpdatePassword>) {
  const { password, handleSuccess } = action.payload;

  const user: User = yield call(putCall, '/api/user/password', { password });

  yield put(successUpdatePassword(user));

  handleSuccess && handleSuccess();
}

function* watchRequestUpdatePassword() {
  yield takeLatest(requestUpdatePassword, callUpdatePassword);
}

// update user avatar
function* callUpdateAvatar(action: ReturnType<typeof requestUpdateAvatar>) {
  const { formData, handleSuccess } = action.payload;

  const user: User = yield call(post, '/api/user/avatar', formData);

  yield put(successUpdateAvatar(user));

  handleSuccess && handleSuccess();
}

function* watchRequestUpdateAvatar() {
  yield takeLatest(requestUpdateAvatar, callUpdateAvatar);
}

export default function* userSagas() {
  yield all([
    fork(watchRequestGetUserVacation),
    fork(watchRequestUpdatePassword),
    fork(watchRequestUpdateAvatar),
  ]);
}
