import { PayloadAction } from '@reduxjs/toolkit';

import { Page, Pageable, defaultPage } from '@/common/page';
import {
  AddVacationRequest,
  DocumentLineStatus,
  Documents,
  DocumentsState,
  VacationDocument,
} from './types';

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
  successAddVacation: (
    state: DocumentsState,
    action: PayloadAction<Documents>,
  ) => {
    state.isLoading = true;
  },
  // get vacation document
  requestGetVacationDocument: (
    state: DocumentsState,
    action: PayloadAction<{ documentId: number }>,
  ) => {
    state.vacationDocument = null;
  },
  successGetVacationDocument: (
    state: DocumentsState,
    action: PayloadAction<{
      document: VacationDocument;
      lines: DocumentLineStatus[];
    }>,
  ) => {
    const { document, lines } = action.payload;

    state.vacationDocument = document;
    state.vacationDocument.lines = lines;
  },
  // cancel document
  requestCancelDocument: (
    state: DocumentsState,
    action: PayloadAction<{ documentId: number }>,
  ) => {
    state.isLoading = true;
  },
  successCancelDocument: (
    state: DocumentsState,
    action: PayloadAction<Documents>,
  ) => {
    state.isLoading = false;
  },
};

export default reducers;
