import { call, all } from 'redux-saga/effects';

import authencationSagas from './authentication/saga';
import documentsTypeSagas from './document/type/saga';
import documentSagas from './document/saga';

export default function* rootSaga() {
  yield all([
    call(authencationSagas),
    call(documentsTypeSagas),
    call(documentSagas),
  ]);
}
