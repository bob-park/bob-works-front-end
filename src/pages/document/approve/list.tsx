import DocumentStatusSelect from '@/components/search/DocumentStatusSelect';
import { DocumentTableList } from '@/components/search/DocumentTableList';
import DocumentTypeSearchSelect from '@/components/search/DocumentTypeSelect';
import { Button, Card, Label, Table, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { MdOutlineRefresh, MdSearch } from 'react-icons/md';

type ApproveSearchCondition = {
  type: DocumentConditionType;
  status: DocumentConditionStatus;
  writerId?: string;
};

const defaultCondition: ApproveSearchCondition = {
  type: 'ALL',
  status: 'ALL',
  writerId: '',
};

const headers = [
  {
    id: 'id',
    value: '결제 아이디',
  },
  {
    id: 'documentType',
    value: '문서 종류',
  },
  {
    id: 'writerId',
    value: '결제 요청자',
  },
  {
    id: 'status',
    value: '결제 상태',
  },
  {
    id: 'reason',
    value: '반려 사유',
  },
  {
    id: 'approvedDateTime',
    value: '결제일',
  },
];

const dummyDatas = [];

export default function ApproveList() {
  const [condition, setCondition] = useState<ApproveSearchCondition>({
    ...defaultCondition,
  });

  const total = 0;

  const handleReset = () => {
    setCondition({
      ...defaultCondition,
    });
  };

  return (
    <div>
      {/* search condition */}
      <Card>
        <form className="grid grid-cols-4 gap-6">
          <DocumentTypeSearchSelect
            type={condition.type}
            onChange={(type) =>
              setCondition({
                ...condition,
                type,
              })
            }
          />
          <DocumentStatusSelect
            status={condition.status}
            onChange={(status) => setCondition({ ...condition, status })}
          />
          <div className="col-span-2"></div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="writerId" value="작성자" />
            </div>
            <TextInput
              id="writerId"
              type="text"
              placeholder="작성자"
              value={condition.writerId}
              onChange={(e) =>
                setCondition({ ...condition, writerId: e.target.value })
              }
            />
          </div>
          <div className="col-span-4">
            <div className="grid grid-cols-8 gap-3">
              <Button
                className="col-start-7"
                color="light"
                onClick={handleReset}
              >
                <MdOutlineRefresh className="mr-2 h-5 w-5" />
                초기화
              </Button>
              <Button>
                <MdSearch className="mr-2 h-5 w-5" />
                조회
              </Button>
            </div>
          </div>
        </form>
      </Card>

      <div className="grid grid-rows-1 mt-10">
        <div>{`총 ${total} 개`}</div>
      </div>

      {/* data list */}
      <div className="grid mt-10">
        <DocumentTableList headers={headers} />
      </div>
    </div>
  );
}
