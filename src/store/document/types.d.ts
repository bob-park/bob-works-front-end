type DocumentsStatus = 'WAITING' | 'PROCEEDING' | 'APPROVE' | 'REJECT';

type Documents = {
  id: number;
  type: DocumentsTypeName;
  writer: User;
  status: DocumentsStatus;
  createdDate?: Date;
  createdBy?: string;
  lastModifiedDate?: Date;
};

type DocumentsState = {
  isLoading: boolean;
  documents: Page<Documents> = {};
};
