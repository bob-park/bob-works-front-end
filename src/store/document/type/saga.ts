import { call, all, takeLatest, fork, put, delay } from 'redux-saga/effects';

import { get } from '@/utils/common';

import { documentTypeActions } from '.';

const { requestGetTypes, successGetTypes } = documentTypeActions;

function* callGetTypes(action: ReturnType<typeof requestGetTypes>) {
  const types: DocumentsType[] = yield call(
    get,
    '/api/document/type/search',
    () => {},
  );

  yield put(successGetTypes(types));
}

function* watchGetTypes() {
  yield takeLatest(requestGetTypes, callGetTypes);
}

export default function* authencationSagas() {
  yield all([fork(watchGetTypes)]);
}
