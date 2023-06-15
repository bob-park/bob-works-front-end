import { call, all, takeLatest, fork, put, delay } from 'redux-saga/effects';

import { get } from '@/utils/common';
import { authenticationActions } from '@/store/authentication';

import { documentTypeActions } from '.';

const { removeAuthentication } = authenticationActions;
const { requestGetTypes, successGetTypes, failureGetTypes } =
  documentTypeActions;

function* callGetTypes(action: ReturnType<typeof requestGetTypes>) {
  try {
    const types: DocumentsType[] = yield call(
      get,
      '/api/document/type/search',
      null,
      () => {},
    );

    yield put(successGetTypes(types));
  } catch (err: any) {
    yield put(failureGetTypes());

    if (err?.response?.status == 401) {
      yield put(removeAuthentication());
    }
  }
}

function* watchGetTypes() {
  yield takeLatest(requestGetTypes, callGetTypes);
}

export default function* authencationSagas() {
  yield all([fork(watchGetTypes)]);
}
