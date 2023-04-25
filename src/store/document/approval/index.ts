import { createSelector } from '@reduxjs/toolkit';
import slice from './slice';
import { RootState } from '@/store/store';
import { DocumentApprovalState } from './types';

const selectorAllState = createSelector(
  (state: DocumentApprovalState) => state.isLoading,
  (state: DocumentApprovalState) => state.approvals,
  (isLoading, approvals) => ({
    isLoading,
    approvals,
  }),
);

export const documentApprovalSelector = {
  all: (state: RootState) => selectorAllState(state[DOCUMENT_APPROVAL]),
};

export const DOCUMENT_APPROVAL = slice.name;
export const documentApprovalReducer = slice.reducer;
export const documentApprovalActions = slice.actions;
