import { call, all, takeLatest, fork, put, delay } from 'redux-saga/effects';

import { get, post } from '@/utils/common';
import { documentActions } from '.';
import { Page } from '@/common/page';
import { Documents } from './types';

const {
  /* get documents */
  requestGetDocuments,
  successGetDocuments,
  /* add vacation documents */
  requestAddVacation,
  scuccessAddVacation,
} = documentActions;

/* get documents */
function* callGetDocuments(action: ReturnType<typeof requestGetDocuments>) {
  const page: Page<Documents> = yield call(
    get,
    '/api/document/search',
    () => {},
  );

  yield put(successGetDocuments(page));
}

function* watchGetDocuments() {
  yield takeLatest(requestGetDocuments, callGetDocuments);
}

/* add vacation documents */
function* callAddVacation(action: ReturnType<typeof requestAddVacation>) {
  const response: Documents = yield call(
    post,
    '/api/document/vacation',
    action.payload,
  );

  yield put(scuccessAddVacation(response));
}

function* watchAddVacation() {
  yield takeLatest(requestAddVacation, callAddVacation);
}

export default function* authencationSagas() {
  yield all([fork(watchGetDocuments), fork(watchAddVacation)]);
}
