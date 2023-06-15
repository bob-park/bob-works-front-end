import { PayloadAction } from '@reduxjs/toolkit';

const reducers = {
  requestGetTypes: (state: DocumentsTypeState) => {
    state.isLoading = true;
    state.types = [];
  },
  successGetTypes: (
    state: DocumentsTypeState,
    action: PayloadAction<DocumentsType[]>,
  ) => {
    state.isLoading = false;
    state.types = action.payload;
  },
  failureGetTypes: (state: DocumentsTypeState) => {
    state.isLoading = false;
  },
};

export default reducers;
