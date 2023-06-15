import { PayloadAction } from '@reduxjs/toolkit';

const reducers = {
  requestGetUserVacation: (state: UserState) => {},
  successGetUserVacation: (state: UserState, action: PayloadAction<User>) => {
    state.user = action.payload;
  },
  failureGetUserVacation: (state: UserState) => {
    state.user = undefined;
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
  // update user avatar
  requestUpdateAvatar: (
    state: UserState,
    action: PayloadAction<{ formData: FormData; handleSuccess: () => void }>,
  ) => {},
  successUpdateAvatar: (state: UserState, action: PayloadAction<User>) => {
    state.user = action.payload;
  },
  // update signature
  requestUpdateSignature: (
    state: UserState,
    action: PayloadAction<{
      userId: number;
      formData: FormData;
      handleSuccess: () => void;
    }>,
  ) => {},
  successUpdateSignature: (state: UserState, action: PayloadAction<User>) => {
    state.user = action.payload;
  },
};

export default reducers;
