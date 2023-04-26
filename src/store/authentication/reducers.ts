import { PayloadAction } from '@reduxjs/toolkit';

const reducers = {
  requestGetUser: (
    state: AuthenticationState,
    action: PayloadAction<{ exceptionHandle: () => void }>,
  ) => {
    state.isLoading = true;
  },
  successGetUser: (state: AuthenticationState, action: PayloadAction<User>) => {
    state.isLoading = false;
    state.user = action.payload;
  },
};

export default reducers;
