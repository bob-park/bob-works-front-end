// saga
import { call, all } from 'redux-saga/effects';

import authencationSagas from './authentication/saga';

export default function* rootSaga() {
  yield all([call(authencationSagas)]);
}
