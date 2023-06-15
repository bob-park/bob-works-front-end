import { call, all, takeLatest, fork, put, delay } from 'redux-saga/effects';

import { get, post, deleteCall } from '@/utils/common';
import { documentActions } from '.';
import { Page } from '@/common/page';
import { DocumentLineStatus, Documents, VacationDocument } from './types';
import { authenticationActions } from '@/store/authentication';

const { removeAuthentication } = authenticationActions;
const {
  /* get documents */
  requestGetDocuments,
  successGetDocuments,
  failureGetDocuments,
  /* add vacation documents */
  requestAddVacation,
  successAddVacation,
  failureAddVacation,
  /** get vacation document */
  requestGetVacationDocument,
  successGetVacationDocument,
  failureGetVacationDocument,
  // cancel document
  requestCancelDocument,
  successCancelDocument,
  failureCancelDocumen,
} = documentActions;

/* get documents */
function* callGetDocuments(action: ReturnType<typeof requestGetDocuments>) {
  try {
    const page: Page<Documents> = yield call(
      get,
      '/api/document/search',
      action.payload,
      () => {},
    );

    yield put(successGetDocuments(page));
  } catch (err: any) {
    yield put(failureGetDocuments());

    if (err?.response?.status == 401) {
      yield put(removeAuthentication());
    }
  }
}

function* watchGetDocuments() {
  yield takeLatest(requestGetDocuments, callGetDocuments);
}

/* add vacation documents */
function* callAddVacation(action: ReturnType<typeof requestAddVacation>) {
  const { requestBody, handleAfter } = action.payload;

  try {
    const response: Documents = yield call(
      post,
      '/api/document/vacation',
      requestBody,
    );

    yield put(successAddVacation(response));

    handleAfter && handleAfter();
  } catch (err: any) {
    yield put(failureAddVacation());

    if (err?.response?.status == 401) {
      yield put(removeAuthentication());
    }
  }
}

function* watchAddVacation() {
  yield takeLatest(requestAddVacation, callAddVacation);
}

/** get vacation document */
function* callGetVacationDocument(
  action: ReturnType<typeof requestGetVacationDocument>,
) {
  const { documentId } = action.payload;

  try {
    const vacation: {
      document: VacationDocument;
      lines: DocumentLineStatus[];
    } = yield call(get, `/api/document/vacation/${documentId}`, null);

    yield put(successGetVacationDocument(vacation));
  } catch (err: any) {
    yield put(failureGetVacationDocument());

    if (err?.response?.status == 401) {
      yield put(removeAuthentication());
    }
  }
}

function* watchGetVacationDocument() {
  yield takeLatest(requestGetVacationDocument, callGetVacationDocument);
}

// cancel document
function* callCancelDocument(action: ReturnType<typeof requestCancelDocument>) {
  const { documentId, handleAfter } = action.payload;

  try {
    const document: Documents = yield call(
      deleteCall,
      `/api/document/${documentId}/cancel`,
    );

    yield put(successCancelDocument(document));

    handleAfter && handleAfter();
  } catch (err: any) {
    yield put(failureCancelDocumen());

    if (err?.response?.status == 401) {
      yield put(removeAuthentication());
    }
  }
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
