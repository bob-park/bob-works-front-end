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
  // get documents
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
  failureGetDocuments: (state: DocumentsState) => {
    state.isLoading = false;
  },
  // add vacation
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
  failureAddVacation: (state: DocumentsState) => {
    state.isLoading = false;
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
  failureGetVacationDocument: (state: DocumentsState) => {
    state.vacationDocument = null;
  },
  // cancel document
  requestCancelDocument: (
    state: DocumentsState,
    action: PayloadAction<{ documentId: number; handleAfter?: () => void }>,
  ) => {
    state.isLoading = true;
  },
  successCancelDocument: (
    state: DocumentsState,
    action: PayloadAction<Documents>,
  ) => {
    state.isLoading = false;
  },
  failureCancelDocumen: (state: DocumentsState) => {
    state.isLoading = false;
  },
};

export default reducers;
