import { Page } from '@/common/page';
import { Documents, DocumentsStatus } from '../types';

type DocumentApproval = {
  id: number;
  document: Documents;
  status: DocumentsStatus;
  approvedDateTime?: Date;
  reason?: string;
};

type DocumentApprovalState = {
  isLoading: boolean;
  approvals: Page<DocumentApproval>;
};
