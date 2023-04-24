import { Label } from 'flowbite-react';
import { useLayoutEffect, useState } from 'react';

type DocumentTypeSearchSelectProps = {
  type: DocumentsTypeName | 'ALL';
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

export default function DocumentTypeSearchSelect({
  type,
}: DocumentTypeSearchSelectProps) {
  const [selectType, setSelectType] = useState<DocumentsTypeName | 'ALL'>(
    'ALL',
  );

  useLayoutEffect(() => {
    setSelectType(type);
  }, []);

  return (
    <div>
      <div className="mb-2 block">
        <Label htmlFor="documentType" value="문서 종류" />
      </div>
      <select
        id="documentType"
        className="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        value={selectType}
        onChange={(e) =>
          setSelectType(e.target.value as DocumentsTypeName | 'ALL')
        }
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
