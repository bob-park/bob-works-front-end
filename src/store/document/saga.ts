import { call, all, takeLatest, fork, put, delay } from 'redux-saga/effects';

import { get, post } from '@/utils/common';
import { documentActions } from '.';
import { Page } from '@/common/page';
import { Documents, VacationDocument } from './types';

const {
  /* get documents */
  requestGetDocuments,
  successGetDocuments,
  /* add vacation documents */
  requestAddVacation,
  successAddVacation,
  /** get vacation document */
  requestGetVacationDocument,
  successGetVacationDocument,
} = documentActions;

/* get documents */
function* callGetDocuments(action: ReturnType<typeof requestGetDocuments>) {
  const page: Page<Documents> = yield call(
    get,
    '/api/document/search',
    action.payload,
    () => {},
  );

  yield put(successGetDocuments(page));
}

function* watchGetDocuments() {
  yield takeLatest(requestGetDocuments, callGetDocuments);
}

/* add vacation documents */
function* callAddVacation(action: ReturnType<typeof requestAddVacation>) {
  const { requestBody, handleAfter } = action.payload;

  const response: Documents = yield call(
    post,
    '/api/document/vacation',
    requestBody,
  );

  yield put(successAddVacation(response));

  handleAfter && handleAfter();
}

function* watchAddVacation() {
  yield takeLatest(requestAddVacation, callAddVacation);
}

/** get vacation document */
function* callGetVacationDocument(
  action: ReturnType<typeof requestGetVacationDocument>,
) {
  const { documentId } = action.payload;

  const vacation: VacationDocument = yield call(
    get,
    `/api/document/vacation/${documentId}`,
    null,
  );

  yield put(successGetVacationDocument(vacation));
}

function* watchGetVacationDocument() {
  yield takeLatest(requestGetVacationDocument, callGetVacationDocument);
}

export default function* authencationSagas() {
  yield all([
    fork(watchGetDocuments),
    fork(watchAddVacation),
    fork(watchGetVacationDocument),
  ]);
}
