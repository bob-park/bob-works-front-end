import { call, all, takeLatest, fork, put, delay } from 'redux-saga/effects';

import { get, putCall, post } from '@/utils/common';

import { userActions } from '.';

import { authenticationActions } from '@/store/authentication';

const {
  // get user vacation
  requestGetUserVacation,
  successGetUserVacation,
  failureGetUserVacation,
  //update password
  requestUpdatePassword,
  successUpdatePassword,
  failureUpdatePassword,
  // update user avatar
  requestUpdateAvatar,
  successUpdateAvatar,
  failureUpdateAvatar,
  //update signature
  requestUpdateSignature,
  successUpdateSignature,
  failureUpdateSignature,
} = userActions;

const { removeAuthentication } = authenticationActions;

// get user vacation
function* callGetUserVacation(
  action: ReturnType<typeof requestGetUserVacation>,
) {
  try {
    const user: User = yield call(get, '/api/user/vacation', null);
    yield put(successGetUserVacation(user));
  } catch (err: any) {
    yield put(failureGetUserVacation());

    if (err?.response?.status == 401) {
      yield put(removeAuthentication());
    }
  }
}

function* watchRequestGetUserVacation() {
  yield takeLatest(requestGetUserVacation, callGetUserVacation);
}

// update password
function* callUpdatePassword(action: ReturnType<typeof requestUpdatePassword>) {
  const { password, handleSuccess } = action.payload;

  try {
    const user: User = yield call(putCall, '/api/user/password', { password });

    yield put(successUpdatePassword(user));

    handleSuccess && handleSuccess();
  } catch (err: any) {
    yield put(failureUpdatePassword());

    if (err?.response?.status == 401) {
      yield put(removeAuthentication());
    }
  }
}

function* watchRequestUpdatePassword() {
  yield takeLatest(requestUpdatePassword, callUpdatePassword);
}

// update user avatar
function* callUpdateAvatar(action: ReturnType<typeof requestUpdateAvatar>) {
  const { formData, handleSuccess } = action.payload;

  try {
    const user: User = yield call(post, '/api/user/avatar', formData);

    yield put(successUpdateAvatar(user));

    handleSuccess && handleSuccess();
  } catch (err: any) {
    yield put(failureUpdateAvatar());

    if (err?.response?.status == 401) {
      yield put(removeAuthentication());
    }
  }
}

function* watchRequestUpdateAvatar() {
  yield takeLatest(requestUpdateAvatar, callUpdateAvatar);
}

// update signature
function* callUpdateSignature(
  action: ReturnType<typeof requestUpdateSignature>,
) {
  const { formData, handleSuccess, userId } = action.payload;

  try {
    const user: User = yield call(
      post,
      `/api/user/${userId}/document/signature`,
      formData,
    );

    yield put(successUpdateSignature(user));

    handleSuccess && handleSuccess();
  } catch (err: any) {
    yield put(failureUpdateSignature());

    if (err?.response?.status == 401) {
      yield put(removeAuthentication());
    }
  }
}

function* watchRequestUpdateSignature() {
  yield takeLatest(requestUpdateSignature, callUpdateSignature);
}

export default function* userSagas() {
  yield all([
    fork(watchRequestGetUserVacation),
    fork(watchRequestUpdatePassword),
    fork(watchRequestUpdateAvatar),
    fork(watchRequestUpdateSignature),
  ]);
}
