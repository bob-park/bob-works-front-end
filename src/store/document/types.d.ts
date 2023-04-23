import { Page } from '@/common/page';

type DocumentsStatus = 'WAITING' | 'PROCEEDING' | 'APPROVE' | 'REJECT';

type Documents = {
  id: number;
  type: DocumentsTypeName;
  writer: User;
  status: DocumentsStatus;
  createdDate: Date;
  createdBy: string;
  lastModifiedDate?: Date;
  lastModifyBy?: string;
};

type DocumentsState = {
  isLoading: boolean;
  documents: Page<Documents> = {};
};
