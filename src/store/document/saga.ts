import { call, all, takeLatest, fork, put, delay } from 'redux-saga/effects';

import { get } from '@/utils/common';
import { documentActions } from '.';
import { Page } from '../type';

const { requestGetDocuments, successGetDocuments } = documentActions;

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

export default function* authencationSagas() {
  yield all([fork(watchGetDocuments)]);
}
