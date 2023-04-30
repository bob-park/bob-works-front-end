import { createSelector } from '@reduxjs/toolkit';
import slice from './slice';
import { RootState } from '@/store/store';

const selectorAllState = createSelector(
  (state: AuthenticationState) => state.isLoading,
  (state: AuthenticationState) => state.user,
  (isLoading, user) => ({
    isLoading,
    user,
  }),
);

export const authentiationSelector = {
  all: (state: RootState) => selectorAllState(state[AUTHENTICATION]),
};

export const AUTHENTICATION = slice.name;
export const authenticationReducer = slice.reducer;
export const authenticationActions = slice.actions;
