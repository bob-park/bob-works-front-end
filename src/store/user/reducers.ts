import { PayloadAction } from '@reduxjs/toolkit';

const reducers = {
  requestGetUserVacation: (state: UserState) => {},
  successGetUserVacation: (state: UserState, action: PayloadAction<User>) => {
    state.user = action.payload;
  },
  requestUpdatePassword: (
    state: UserState,
    action: PayloadAction<{ password: string; handleSuccess: () => void }>,
  ) => {
    state.isLoading = true;
  },
  successUpdatePassword: (state: UserState, action: PayloadAction<User>) => {
    state.user = action.payload;
    state.isLoading = false;
  },
};

export default reducers;
