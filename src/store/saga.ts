import { call, all } from 'redux-saga/effects';

import authencationSagas from './authentication/saga';
import documentsTypeSagas from './document/type/saga';

export default function* rootSaga() {
  yield all([call(authencationSagas), call(documentsTypeSagas)]);
}
