import { createSelector } from '@reduxjs/toolkit';
import slice from './slice';
import { RootState } from '@/store/store';
import { DocumentsState } from './types';

const selectorAllState = createSelector(
  (state: DocumentsState) => state.isLoading,
  (state: DocumentsState) => state.documents,
  (isLoading, documents) => ({
    isLoading,
    documents,
  }),
);

export const authentiationSelector = {
  all: (state: RootState) => selectorAllState(state[DOCUMENT]),
};

export const DOCUMENT = slice.name;
export const documentReducer = slice.reducer;
export const documentActions = slice.actions;
