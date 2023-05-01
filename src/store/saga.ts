import { call, all } from 'redux-saga/effects';

import authencationSagas from './authentication/saga';
import documentSagas from './document/saga';
import documentsTypeSagas from './document/type/saga';
import documentApprovalSagas from './document/approval/saga';
import userSagas from './user/saga';

export default function* rootSaga() {
  yield all([
    call(authencationSagas),
    call(documentSagas),
    call(documentsTypeSagas),
    call(documentApprovalSagas),
    call(userSagas),
  ]);
}
