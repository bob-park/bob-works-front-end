import { ChangeEvent, useLayoutEffect, useState } from 'react';
import { Label } from 'flowbite-react';

type DocumentTypeSearchSelectProps = {
  type: DocumentConditionType;
  onChange?: (type: DocumentConditionType) => void;
};

const types: DocumentCondtionSelect[] = [
  {
    id: 'ALL',
    name: '전체',
  },
  {
    id: 'VACATION',
    name: '휴가계',
  },
];

export default function DocumentTypeSelect({
  type,
  onChange,
}: DocumentTypeSearchSelectProps) {
  const [selectType, setSelectType] = useState<DocumentConditionType>('ALL');

  useLayoutEffect(() => {
    setSelectType(type);
  }, [type]);

  const handleChangle = (e: ChangeEvent<HTMLSelectElement>) => {
    const changeType = e.target.value as DocumentConditionType;

    setSelectType(changeType);

    onChange && onChange(changeType);
  };

  return (
    <div>
      <div className="mb-2 block">
        <Label htmlFor="documentType" value="문서 종류" />
      </div>
      <select
        id="documentType"
        className="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        value={selectType}
        onChange={handleChangle}
      >
        {types.map((type) => (
          <option key={type.id} value={type.id}>
            {type.name}
          </option>
        ))}
      </select>
    </div>
  );
}
