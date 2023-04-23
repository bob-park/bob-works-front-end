import { createSelector } from '@reduxjs/toolkit';
import slice from './slice';
import { RootState } from '@/store/store';

const selectorAllState = createSelector(
  (state: DocumentsTypeState) => state.isLoading,
  (state: DocumentsTypeState) => state.types,
  (isLoading, types) => ({
    isLoading,
    types,
  }),
);

export const documentTypeSelector = {
  all: (state: RootState) => selectorAllState(state[DOCUMENT_TYPE]),
};

export const DOCUMENT_TYPE = slice.name;
export const documentTypeReducer = slice.reducer;
export const documentTypeActions = slice.actions;
