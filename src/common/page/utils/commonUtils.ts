import { VacationSubType, VacationType } from '@/store/document/types';
import { format } from 'date-fns';

const vacationTypes: DocumentCondtionSelect[] = [
  {
    id: 'GENERAL',
    name: '연 차',
  },
  {
    id: 'ALTERNATIVE',
    name: '대 체 휴 가',
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

export function parseType(id: VacationType, isHalf: boolean) {
  if (id === 'GENERAL' && isHalf) {
    return '반 차';
  }

  return vacationTypes.find((item) => item.id == id)?.name;
}

export function parseSubType(id: VacationSubType) {
  return vacationSubTypes.find((item) => item.id == id)?.name;
}
