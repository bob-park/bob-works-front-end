import { combineReducers, configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware, { Task } from 'redux-saga';
import { createWrapper } from 'next-redux-wrapper';

import rootSaga from './saga';

import { AUTHENTICATION, authenticationReducer } from './authentication';
import { DOCUMENT, documentReducer } from './document';
import { DOCUMENT_TYPE, documentTypeReducer } from './document/type';
import {
  DOCUMENT_APPROVAL,
  documentApprovalReducer,
} from './document/approval';

import { USER, userReducer } from './user';

const rootReducer = combineReducers({
  [AUTHENTICATION]: authenticationReducer,
  [DOCUMENT_TYPE]: documentTypeReducer,
  [DOCUMENT]: documentReducer,
  [DOCUMENT_APPROVAL]: documentApprovalReducer,
  [USER]: userReducer,
});

function rootStore() {
  // saga
  const sagaMiddleware = createSagaMiddleware();

  const store = configureStore({
    reducer: rootReducer,
    middleware: [sagaMiddleware],
    devTools: process.env.NODE_ENV !== 'production',
  });

  sagaMiddleware.run(rootSaga);

  return store;
}

const store = rootStore();

export type RootState = ReturnType<typeof rootReducer>;

export const wrapper = createWrapper<AppStore>(rootStore, {
  debug: process.env.NEXT_PUBLIC_NODE_ENV !== 'production',
});

export type AppStore = ReturnType<typeof rootStore>;
export type AppDispatch = typeof store.dispatch;
