import { useState, FormEvent, useEffect } from 'react';

import { useRouter } from 'next/router';

import { Button, Card, Label, Spinner, TextInput } from 'flowbite-react';
import Datepicker from 'react-tailwindcss-datepicker';
import { GiCancel } from 'react-icons/gi';
import { RiFileTransferLine } from 'react-icons/ri';

import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook';

import { documentTypeActions } from '@/store/document/type';
import { AddVacationRequest } from '@/store/document/types';
import { VacationType } from '@/store/document/types';
import { VacationSubType } from '@/store/document/types';
import { documentActions } from '@/store/document';

const { requestAddVacation } = documentActions;
const { requestGetTypes } = documentTypeActions;

type VacationSelect = {
  id: string;
  name: string;
};

type VacationDate = {
  startDate: Date;
  endDate: Date;
};

const vacationTypes: VacationSelect[] = [
  {
    id: 'GENERAL',
    name: '연차',
  },
  {
    id: 'ALTERNATIVE',
    name: '대체휴가',
  },
];

const vacationSubTypes: VacationSelect[] = [
  {
    id: 'ALL',
    name: '종일',
  },
  {
    id: 'AM',
    name: '오전',
  },
  {
    id: 'PM',
    name: '오후',
  },
];

export default function VacationDocumentRequest() {
  const router = useRouter();

  const { isLoading } = useAppSelector((state) => state.document);
  const { types } = useAppSelector((state) => state.documentsType);
  const dispatch = useAppDispatch();

  const documentType = types?.find((type) => type.type === 'VACATION');

  const [vacationType, setVacationType] = useState<VacationSelect>(
    vacationTypes[0],
  );

  const [vacationSubType, setVacationSubType] = useState<VacationSelect>(
    vacationSubTypes[0],
  );

  const [dateValue, setDateValue] = useState<VacationDate>({
    startDate: new Date(),
    endDate: new Date(),
  });

  const [reason, setReason] = useState<string>('');

  useEffect(() => {
    dispatch(requestGetTypes());
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!documentType || !vacationType || !vacationSubType) {
      return;
    }

    const requestBody: AddVacationRequest = {
      typeId: documentType.id,
      vacationType: vacationType.id as VacationType,
      vacationSubType:
        vacationSubType.id !== 'ALL'
          ? (vacationSubType.id as VacationSubType)
          : undefined,
      vacationDateFrom: dateValue.startDate,
      vacationDateTo: dateValue.endDate,
      reason,
    };

    dispatch(
      requestAddVacation({
        requestBody,
        handleAfter: () => {
          router.push('/document/search');
        },
      }),
    );
  };

  return (
    <div className="grid grid-cols-1 gap-10">
      <p className="text-2xl font-bold">휴가 신청</p>
      <Card>
        <form className="grid grid-cols-4 gap-5" onSubmit={handleSubmit}>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="vacationType" value="종류" />
            </div>
            <select
              id="vacationType"
              className="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={vacationType?.id}
              onChange={(e) => {
                const type = vacationTypes.find(
                  (vacationType) => vacationType.id == e.target.value,
                );

                type && setVacationType(type);
              }}
            >
              {vacationTypes.map((vacationType) => (
                <option key={vacationType.id} value={vacationType.id}>
                  {vacationType.name}
                </option>
              ))}
            </select>
          </div>
          <div className="">
            <div className="mb-2 block">
              <Label htmlFor="vacationSubType" value="부가 종류" />
            </div>
            <select
              id="vacationSubType"
              className="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={vacationSubType?.id}
              onChange={(e) => {
                const subType = vacationSubTypes.find(
                  (vacatioSubnType) => vacatioSubnType.id == e.target.value,
                );
                subType && setVacationSubType(subType);
              }}
            >
              {vacationSubTypes.map((vacationSubType) => (
                <option key={vacationSubType.id} value={vacationSubType.id}>
                  {vacationSubType.name}
                </option>
              ))}
            </select>
          </div>
          <div></div>
          <div className="col-span-2">
            <div className="mb-2 block">
              <Label htmlFor="vacationDateFrom" value="휴가일" />
            </div>
            <Datepicker
              placeholder="날짜 선택"
              minDate={new Date(new Date().getFullYear(), 1, 1)}
              maxDate={new Date(new Date().getFullYear(), 11, 31)}
              value={dateValue}
              showFooter
              onChange={(value) => setDateValue(value as VacationDate)}
              i18n="ko"
              configs={{
                footer: {
                  cancel: '취소',
                  apply: '적용',
                },
              }}
            />
          </div>
          <div className="col-span-4">
            <div className="mb-2 block">
              <Label htmlFor="reason" value="사유" />
            </div>
            <TextInput
              id="reason"
              placeholder="개인 사유"
              required={true}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>
          <div className="col-span-4">
            <div className="grid grid-cols-8 gap-3">
              <Button className="col-start-7" color="light">
                <GiCancel className="mr-2 h-5 w-5" size="" />
                취소
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Spinner
                      className="mr-2 h-5 w-5"
                      color="info"
                      aria-label="Info spinner example"
                    />
                    요청중
                  </>
                ) : (
                  <>
                    <RiFileTransferLine className="mr-2 h-5 w-5" size="" />
                    요청
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
}
