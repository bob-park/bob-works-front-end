import { PayloadAction } from '@reduxjs/toolkit';

import { Page, Pageable, defaultPage } from '@/common/page';
import { AddVacationRequest, Documents, DocumentsState } from './types';

const reducers = {
  requestGetDocuments: (
    state: DocumentsState,
    action: PayloadAction<any | Pageable>,
  ) => {
    state.isLoading = true;
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
    action: PayloadAction<{
      requestBody: AddVacationRequest;
      handleAfter?: () => void;
    }>,
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
