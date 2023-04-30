import { PayloadAction } from '@reduxjs/toolkit';
import { DocumentApproval, DocumentApprovalState } from './types';
import { Page, Pageable } from '@/common/page';
import { DocumentsStatus } from '../types';

const reducers = {
  requestGetApprovals: (
    state: DocumentApprovalState,
    action: PayloadAction<Pageable>,
  ) => {
    state.isLoading = true;
  },
  successGetApporvals: (
    state: DocumentApprovalState,
    action: PayloadAction<Page<DocumentApproval>>,
  ) => {
    state.isLoading = false;
    state.approvals = action.payload;
  },
  requestGetApproval: (
    state: DocumentApprovalState,
    action: PayloadAction<{ approvalId: number }>,
  ) => {
    state.approval = null;
  },
  successGetApproval: (
    state: DocumentApprovalState,
    action: PayloadAction<DocumentApproval>,
  ) => {
    state.approval = action.payload;
  },
  // approve document
  requestApproveDocument: (
    state: DocumentApprovalState,
    action: PayloadAction<{
      id: number;
      status: DocumentsStatus;
      reason?: string;
      handleAfter: () => void;
    }>,
  ) => {
    state.isLoading = true;
  },
  successApproveDocument: (state: DocumentApprovalState) => {
    state.isLoading = false;
  },
};

export default reducers;
