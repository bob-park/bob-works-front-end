import { PayloadAction } from '@reduxjs/toolkit';
import { DocumentApproval, DocumentApprovalState } from './types';
import { Page, Pageable } from '@/common/page';

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
};

export default reducers;
