import { useState, FormEvent } from 'react';

import { useRouter } from 'next/router';

import { Button, Card, Label, TextInput } from 'flowbite-react';
import Datepicker from 'react-tailwindcss-datepicker';
import { GiCancel } from 'react-icons/gi';
import { RiFileTransferLine } from 'react-icons/ri';

type VacationSelect = {
  id: string;
  name: string;
};

type VacationDate = {
  startDate: Date | null;
  endDate: Date | null;
};

const types: VacationSelect[] = [
  {
    id: 'GENERAL',
    name: '연차',
  },
  {
    id: 'ALTERNATIVE',
    name: '대체휴가',
  },
];

const subTypes: VacationSelect[] = [
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

  const [dateValue, setDateValue] = useState<VacationDate>({
    startDate: null,
    endDate: null,
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    router.push('/document/search');
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
            >
              {types.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
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
            >
              {subTypes.map((subType) => (
                <option key={subType.id} value={subType.id}>
                  {subType.name}
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
            <TextInput id="reason" placeholder="개인 사유" required={true} />
          </div>
          <div className="col-span-4">
            <div className="grid grid-cols-8 gap-3">
              <Button className="col-start-7" color="light">
                <GiCancel className="mr-2 h-5 w-5" size="" />
                취소
              </Button>
              <Button type="submit">
                <RiFileTransferLine className="mr-2 h-5 w-5" size="" />
                제출
              </Button>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
}
