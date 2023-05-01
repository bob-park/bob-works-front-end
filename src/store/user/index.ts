import { createSelector } from '@reduxjs/toolkit';
import slice from './slice';
import { RootState } from '@/store/store';

const selectorAllState = createSelector(
  (state: UserState) => state.user,
  (user) => ({
    user,
  }),
);

export const userSelector = {
  all: (state: RootState) => selectorAllState(state[USER]),
};

export const USER = slice.name;
export const userReducer = slice.reducer;
export const userActions = slice.actions;
