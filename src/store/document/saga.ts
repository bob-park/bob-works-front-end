import { call, all, takeLatest, fork, put, delay } from 'redux-saga/effects';

import { get, post, deleteCall } from '@/utils/common';
import { documentActions } from '.';
import { Page } from '@/common/page';
import { DocumentLineStatus, Documents, VacationDocument } from './types';

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
  // cancel document
  requestCancelDocument,
  successCancelDocument,
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

  const vacation: { document: VacationDocument; lines: DocumentLineStatus[] } =
    yield call(get, `/api/document/vacation/${documentId}`, null);

  yield put(successGetVacationDocument(vacation));
}

function* watchGetVacationDocument() {
  yield takeLatest(requestGetVacationDocument, callGetVacationDocument);
}

// cancel document
function* callCancelDocument(action: ReturnType<typeof requestCancelDocument>) {
  const { documentId, handleAfter } = action.payload;

  const document: Documents = yield call(
    deleteCall,
    `/api/document/${documentId}/cancel`,
  );

  yield put(successCancelDocument(document));

  handleAfter && handleAfter();
}

function* watchCancelDocument() {
  yield takeLatest(requestCancelDocument, callCancelDocument);
}

export default function* authencationSagas() {
  yield all([
    fork(watchGetDocuments),
    fork(watchAddVacation),
    fork(watchGetVacationDocument),
    fork(watchCancelDocument),
  ]);
}
