type DocumentsTypeName = 'VACATION';

type DocumentsType = {
  id: number;
  type: DocumentTypeName;
  name: string;
  approval?: DocumentsTypeApprovalLine;
};

type DocumentsTypeState = {
  isLoading: boolean;
  types: DocumentsType[];
};

type DocumentsTypeApprovalLine = {
  id: number;
  user: User;
  next?: DocumentsTypeApprovalLine;
};
