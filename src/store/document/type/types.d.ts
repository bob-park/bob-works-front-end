type DocumentsTypeName = 'VACATION';

type DocumentsType = {
  id: number;
  type: DocumentTypeName;
  name: string;
};

type DocumentsTypeState = {
  isLoading: boolean;
  types: DocumentsType[];
};
