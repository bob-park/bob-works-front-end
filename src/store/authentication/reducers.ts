import { PayloadAction } from '@reduxjs/toolkit';

const reducers = {
  requestGetUser: (
    state: Authentication,
    action: PayloadAction<{ exceptionHandle: () => void }>,
  ) => {
    state.isLoggedIn = false;
    state.user = undefined;
  },
  successGetUser: (state: Authentication, action: PayloadAction<User>) => {
    state.isLoggedIn = true;
    state.user = action.payload;
  },
};

export default reducers;
