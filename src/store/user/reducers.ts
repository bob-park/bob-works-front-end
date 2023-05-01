import { PayloadAction } from '@reduxjs/toolkit';

const reducers = {
  requestGetUserVacation: (state: UserState) => {},
  successGetUserVacation: (state: UserState, action: PayloadAction<User>) => {
    state.user = action.payload;
  },
};

export default reducers;
