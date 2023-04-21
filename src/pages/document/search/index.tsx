import { ChangeEvent, useState } from 'react';
import { Label, Card, Button, Table, Checkbox } from 'flowbite-react';
import { MdOutlineRefresh, MdSearch } from 'react-icons/md';
import { format } from 'date-fns';

type DocumentType = 'VACATION' | 'EXPENDITURE';
type DocumentStatus = 'WAITING' | 'PROCEEDING' | 'APPROVE' | 'REJECT';

type SearchCondition = {
  type?: DocumentType;
  writer?: string;
  status?: DocumentStatus;
  from?: Date;
  to?: Date;
};

type DocumentCondtionSelect = {
  id: string;
  name: string;
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
  {
    id: 'EXPENDITURE',
    name: '지출결의서',
  },
];

const states: DocumentCondtionSelect[] = [
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
];

const headers = [
  {
    id: 'id',
    name: '문서 아이디',
  },
  {
    id: 'type',
    name: '종류',
  },
  {
    id: 'status',
    name: '상태',
  },
  {
    id: 'writer',
    name: '신청자',
  },
  {
    id: 'createdDate',
    name: '생성일',
  },
];

const dummyDatas = [
  {
    id: 1,
    type: 'VACATION',
    status: 'APPROVE',
    writer: 'Bob Park',
    createdDate: new Date('2023-04-15T23:25:10.560815'),
  },
  {
    id: 2,
    type: 'VACATION',
    status: 'WAITING',
    writer: 'Bob Park',
    createdDate: new Date('2023-04-15T23:25:10.560815'),
  },
  {
    id: 3,
    type: 'VACATION',
    status: 'PROCEEDING',
    writer: 'Bob Park',
    createdDate: new Date('2023-04-15T23:25:10.560815'),
  },
  {
    id: 4,
    type: 'VACATION',
    status: 'REJECT',
    writer: 'Bob Park',
    createdDate: new Date('2023-04-15T23:25:10.560815'),
  },
  {
    id: 5,
    type: 'VACATION',
    status: 'APPROVE',
    writer: 'Bob Park',
    createdDate: new Date('2023-04-15T23:25:10.560815'),
  },
  {
    id: 6,
    type: 'VACATION',
    status: 'APPROVE',
    writer: 'Bob Park',
    createdDate: new Date('2023-04-15T23:25:10.560815'),
  },
];

export default function Search() {
  const [condition, setCondition] = useState<SearchCondition>({});

  const documentTypeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    let type: string | null = e.target.value;

    if (type == 'ALL') {
      type = null;
    }

    setCondition({
      ...condition,
      type: type as DocumentType,
    });
  };

  const documentStatusHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    let status: string | null = e.target.value;

    if (status == 'ALL') {
      status = null;
    }

    setCondition({
      ...condition,
      status: status as DocumentStatus,
    });
  };

  const resetConditionHandler = () => {
    setCondition({});
  };

  const parseToDoucmentType = (
    id: DocumentType,
  ): DocumentCondtionSelect | undefined => {
    return types.find((type) => type.id == id);
  };

  const parseToDocumentStatus = (
    id: DocumentStatus,
  ): DocumentCondtionSelect | undefined => {
    return states.find((state) => state.id == id);
  };

  return (
    <div>
      {/* search condition */}
      <Card>
        <form className="grid grid-cols-4 gap-5">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="documentType" value="문서 종류" />
            </div>
            <select
              id="documentType"
              className="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={condition.type || 'ALL'}
              onChange={(e) => documentTypeHandler(e)}
            >
              {types.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="documentStatus" value="상태" />
            </div>
            <select
              id="documentStatus"
              className="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={condition.status || 'ALL'}
              onChange={(e) => documentStatusHandler(e)}
            >
              {states.map((state) => (
                <option key={state.id} value={state.id}>
                  {state.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-span-4">
            <div className="grid grid-cols-8 gap-3">
              <Button
                className="col-start-7"
                color="light"
                onClick={resetConditionHandler}
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
      {/* data list */}
      <div className="grid mt-20">
        <Table hoverable={true}>
          <Table.Head>
            <Table.HeadCell className="!p-4">
              <Checkbox />
            </Table.HeadCell>
            {headers.map((header) => (
              <Table.HeadCell key={header.id}>{header.name}</Table.HeadCell>
            ))}
          </Table.Head>
          <Table.Body className="divide-y">
            {dummyDatas.map((data) => (
              <Table.Row key={data.id}>
                <Table.Cell className="!p-4">
                  <Checkbox />
                </Table.Cell>
                <Table.Cell>{data.id}</Table.Cell>
                <Table.Cell>
                  {parseToDoucmentType(data.type as DocumentType)?.name}
                </Table.Cell>
                <Table.Cell>
                  {parseToDocumentStatus(data.status as DocumentStatus)?.name}
                </Table.Cell>
                <Table.Cell>{data.writer}</Table.Cell>
                <Table.Cell>
                  {String(format(data.createdDate, 'yyyy-MM-dd hh:mm:ss'))}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}
