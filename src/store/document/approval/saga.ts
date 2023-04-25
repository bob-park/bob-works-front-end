import { call, all, takeLatest, fork, put, delay } from 'redux-saga/effects';

import { get, post } from '@/utils/common';
import { Page } from '@/common/page';

import { documentApprovalActions } from '.';
import { DocumentApproval } from './types';

const {
  /* get aprrovals */
  requestGetApprovals,
  successGetApporvals,
} = documentApprovalActions;

/* get approvals */
function* callGetApporvals(action: ReturnType<typeof requestGetApprovals>) {
  const page: Page<DocumentApproval> = yield call(
    get,
    '/api/document/approval/search',
    action.payload,
  );

  yield put(successGetApporvals(page));
}

function* watchGetApprovals() {
  yield takeLatest(requestGetApprovals, callGetApporvals);
}

export default function* docuemntApprovalSagas() {
  yield all([fork(watchGetApprovals)]);
}
