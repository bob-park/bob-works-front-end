import { Label } from 'flowbite-react';

import { ChangeEvent, useLayoutEffect, useState } from 'react';

type DocumentStatusSelectProps = {
  status: DocumentConditionStatus;
  onChange?: (status: DocumentConditionStatus) => void;
};

const statuses: DocumentCondtionSelect[] = [
  {
    id: 'ALL',
    name: '전체',
  },
  {
    id: 'WAITING',
    name: '대기',
  },
  {
    id: 'PROCEEDING',
    name: '진행',
  },
  {
    id: 'APPROVE',
    name: '승인',
  },
  {
    id: 'REJECT',
    name: '반려',
  },
  {
    id: 'CANCEL',
    name: '취소',
  },
];

export function parseStatus(status: DocumentConditionStatus) {
  return statuses.find((item) => item.id === status)?.name || 'ALL';
}

export default function DocumentStatusSelect({
  status,
  onChange,
}: DocumentStatusSelectProps) {
  const [selectStatus, setSelectStatus] =
    useState<DocumentConditionStatus>('ALL');

  useLayoutEffect(() => {
    setSelectStatus(status);
  }, [status]);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const changeStatus = e.target.value as DocumentConditionStatus;

    setSelectStatus(changeStatus);

    onChange && onChange(changeStatus);
  };

  return (
    <div>
      <div className="mb-2 block">
        <Label htmlFor="documentStatus" value="상태" />
      </div>
      <select
        id="documentStatus"
        className="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        value={selectStatus}
        onChange={handleChange}
      >
        {statuses.map((status) => (
          <option key={status.id} value={status.id}>
            {status.name}
          </option>
        ))}
      </select>
    </div>
  );
}
