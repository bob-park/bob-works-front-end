import { PayloadAction } from '@reduxjs/toolkit';

import { Page, defaultPage } from '@/common/page';
import { AddVacationRequest, Documents, DocumentsState } from './types';

const reducers = {
  requestGetDocuments: (state: DocumentsState) => {
    state.isLoading = true;
    state.documents = defaultPage;
  },
  successGetDocuments: (
    state: DocumentsState,
    action: PayloadAction<Page<Documents>>,
  ) => {
    state.isLoading = false;
    state.documents = action.payload;
  },
  requestAddVacation: (
    state: DocumentsState,
    action: PayloadAction<AddVacationRequest>,
  ) => {
    state.isLoading = false;
  },
  scuccessAddVacation: (
    state: DocumentsState,
    action: PayloadAction<Documents>,
  ) => {
    state.isLoading = true;
  },
};

export default reducers;
