import {
  combineReducers,
  MiddlewareArray,
  configureStore,
} from '@reduxjs/toolkit';
import createSagaMiddleware, { Task } from 'redux-saga';
import { createWrapper } from 'next-redux-wrapper';

import rootSaga from './saga';

import { AUTHENTICATION, authenticationReducer } from './authentication';
import { DOCUMENT_TYPE, documentTypeReducer } from './document/type';

const rootReducer = combineReducers({
  [AUTHENTICATION]: authenticationReducer,
  [DOCUMENT_TYPE]: documentTypeReducer,
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
