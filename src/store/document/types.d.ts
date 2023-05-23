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
  vacationDocument?: VacationDocument | null;
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

type DocumentLineStatus = {
  id: number;
  uniqueUserId: number;
  userId: string;
  username: string;
  positionId: number;
  positionName: string;
  status: DocumentsStatus;
  approvedDateTime?: Date;
  reason?: string;
};

type VacationDocument = Documents & {
  vacationType: VacationType;
  vacationSubType?: VacationSubType;
  vacationDateFrom: Date;
  vacationDateTo: Date;
  daysCount: number;
  reason: string;
  lines: DocumentLineStatus[];
};
