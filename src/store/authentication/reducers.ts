import { PayloadAction } from '@reduxjs/toolkit';

const reducers = {
  requestGetUser: (
    state: AuthenticationState,
    action: PayloadAction<{ exceptionHandle: () => void }>,
  ) => {
    state.isLoading = true;
    state.isLoggedIn = false;
  },
  successGetUser: (state: AuthenticationState, action: PayloadAction<User>) => {
    state.isLoading = false;
    state.isLoggedIn = true;
    state.user = action.payload;
  },
};

export default reducers;
