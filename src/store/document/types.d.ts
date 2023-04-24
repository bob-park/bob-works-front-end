import { Page } from '@/common/page';

type DocumentsStatus = 'WAITING' | 'PROCEEDING' | 'APPROVE' | 'REJECT';

type Documents = {
  id: number;
  documentType: DocumentsType;
  writer: User;
  status: DocumentsStatus;
  createdDate: Date;
  createdBy: string;
  lastModifiedDate?: Date;
  lastModifyBy?: string;
};

type DocumentsState = {
  isLoading: boolean;
  documents: Page<Documents>;
};

type VacationType = 'GENERAL' | 'ALTERNATIVE';
type VacationSubType = 'AM' | 'PM';

type AddVacationRequest = {
  typeId: number;
  vacationType: VacationType;
  vacationSubType?: VacationSubType;
  vacationDateFrom: Date;
  vacationDateTo: Date;
  reason: string;
};
