import { ChangeEvent, useLayoutEffect, useState } from 'react';
import {
  Label,
  Card,
  Button,
  Table,
  Checkbox,
  Pagination,
} from 'flowbite-react';
import { MdOutlineRefresh, MdSearch } from 'react-icons/md';
import { format } from 'date-fns';

import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook';

import { documentActions } from '@/store/document';

import DocumentTypeSearchSelect from '@/components/search/DocumentTypeSelect';
import DocumentStatusSelect, {
  parseStatus,
} from '@/components/search/DocumentStatusSelect';

type SearchCondition = {
  type: DocumentConditionType;
  writer?: string;
  status: DocumentConditionStatus;
  from?: Date;
  to?: Date;
};

const { requestGetDocuments } = documentActions;

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

const defaultCondition: SearchCondition = {
  type: 'ALL',
  status: 'ALL',
};

export default function Search() {
  const dispatch = useAppDispatch();
  const { documents } = useAppSelector((state) => state.document);
  const {} = useAppSelector((state) => state.documentsType);

  const { content, pageable, total } = documents;

  const currentPage = pageable.page + 1;
  const totalPages =
    Math.floor(documents.total / documents.pageable.size) +
    (documents.total % documents.pageable.size > 0 ? 1 : 0);

  const [condition, setCondition] = useState<SearchCondition>(defaultCondition);

  useLayoutEffect(() => {
    handlePageChange(1);
  }, []);

  const resetConditionHandler = () => {
    setCondition(defaultCondition);
  };

  const handlePageChange = (page: number) => {
    dispatch(
      requestGetDocuments({
        ...pageable,
        page: page - 1,
      }),
    );
  };

  return (
    <div>
      {/* search condition */}
      <Card>
        <form className="grid grid-cols-4 gap-5">
          <DocumentTypeSearchSelect
            type={condition.type}
            onChange={(type) => setCondition({ ...condition, type })}
          />
          <DocumentStatusSelect
            status={condition.status}
            onChange={(status) => setCondition({ ...condition, status })}
          />
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

      <div className="grid grid-rows-1 mt-10">
        <div>{`총 ${total} 개`}</div>
      </div>

      {/* data list */}
      <div className="grid mt-10">
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
            {content.map((data) => (
              <Table.Row key={data.id}>
                <Table.Cell className="!p-4">
                  <Checkbox />
                </Table.Cell>
                <Table.Cell>{data.id}</Table.Cell>
                <Table.Cell>{data.documentType.name}</Table.Cell>
                <Table.Cell>{parseStatus(data.status)}</Table.Cell>
                <Table.Cell>{data.writer.name}</Table.Cell>
                <Table.Cell>
                  {String(
                    format(new Date(data.createdDate), 'yyyy-MM-dd hh:mm:ss'),
                  )}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
      <div className="mt-4 grid grid-rows-2 justify-center items-center">
        <div className="text-center text-gray-500">
          {`총 ${totalPages} 페이지 중 `}
          <span className="font-black">{`${currentPage} 페이지`}</span>
        </div>
        <Pagination
          currentPage={currentPage}
          layout="navigation"
          onPageChange={handlePageChange}
          totalPages={totalPages}
          showIcons
          previousLabel="이전"
          nextLabel="다음"
        />
      </div>
    </div>
  );
}
