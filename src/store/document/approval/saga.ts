import { call, all, takeLatest, fork, put, delay } from 'redux-saga/effects';

import { get, post, putCall } from '@/utils/common';
import { Page } from '@/common/page';
import { authenticationActions } from '@/store/authentication';

import { documentApprovalActions } from '.';
import { DocumentApproval } from './types';

const { removeAuthentication } = authenticationActions;

const {
  /* get aprrovals */
  requestGetApprovals,
  successGetApporvals,
  failureGetApprovals,
  /* get apporval */
  requestGetApproval,
  successGetApproval,
  failureGetApproval,
  // approve approval
  requestApproveDocument,
  successApproveDocument,
  failureApproveDocument,
} = documentApprovalActions;

/* get approvals */
function* callGetApporvals(action: ReturnType<typeof requestGetApprovals>) {
  try {
    const page: Page<DocumentApproval> = yield call(
      get,
      '/api/document/approval/search',
      action.payload,
    );

    yield put(successGetApporvals(page));
  } catch (err: any) {
    yield put(failureGetApprovals());

    if (err?.response?.status == 401) {
      yield put(removeAuthentication());
    }
  }
}

function* watchGetApprovals() {
  yield takeLatest(requestGetApprovals, callGetApporvals);
}

/* get approval */
function* callGetApproval(action: ReturnType<typeof requestGetApproval>) {
  const { approvalId } = action.payload;

  const approval: DocumentApproval = yield call(
    get,
    `/api/document/approval/${approvalId}`,
    null,
  );

  yield put(successGetApproval(approval));
}

function* watchGetApproval() {
  yield takeLatest(requestGetApproval, callGetApproval);
}

function* callApproveDocument(
  action: ReturnType<typeof requestApproveDocument>,
) {
  const { id, status, reason, handleAfter } = action.payload;

  yield call(putCall, `/api/document/approval/${id}`, { status, reason });

  yield put(successApproveDocument());

  handleAfter && handleAfter();
}

function* watchRequestApproveDocument() {
  yield takeLatest(requestApproveDocument, callApproveDocument);
}

export default function* docuemntApprovalSagas() {
  yield all([
    fork(watchGetApprovals),
    fork(watchGetApproval),
    fork(watchRequestApproveDocument),
  ]);
}
