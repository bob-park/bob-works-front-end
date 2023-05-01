import { VacationSubType, VacationType } from '@/store/document/types';
import { format } from 'date-fns';

const vacationTypes: DocumentCondtionSelect[] = [
  {
    id: 'GENERAL',
    name: '연차',
  },
  {
    id: 'ALTERNATIVE',
    name: '대체휴가',
  },
];

const vacationSubTypes: DocumentCondtionSelect[] = [
  {
    id: 'AM',
    name: '오전',
  },
  {
    id: 'PM',
    name: '오후',
  },
];

export function formatDate(date: Date, str: string = 'yyyy. MM. dd.') {
  return format(new Date(date), str);
}

export function parseType(id: VacationType) {
  return vacationTypes.find((item) => item.id == id)?.name;
}

export function parseSubType(id: VacationSubType) {
  return vacationSubTypes.find((item) => item.id == id)?.name;
}
