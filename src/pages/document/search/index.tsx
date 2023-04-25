import { useLayoutEffect, useState } from 'react';
import { Card, Button } from 'flowbite-react';
import { MdOutlineRefresh, MdSearch } from 'react-icons/md';
import { format } from 'date-fns';

import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook';

import { documentActions } from '@/store/document';

import {
  DocumentPagination,
  DocumentTypeSelect,
  DocumentStatusSelect,
  DocumentTableList,
} from '@/components/search';
import { parseStatus } from '@/components/search/DocumentStatusSelect';

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
    value: '문서 아이디',
  },
  {
    id: 'type',
    value: '종류',
  },
  {
    id: 'status',
    value: '상태',
    parse: (input: DocumentConditionStatus) => parseStatus(input),
  },
  {
    id: 'writer',
    value: '신청자',
  },
  {
    id: 'createdDate',
    value: '생성일',
    parse: (input: Date) => format(new Date(input), 'yyyy-MM-dd hh:mm:ss'),
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

  const dataList = content.map((item) => {
    return {
      id: item.id,
      type: item.documentType.name,
      status: item.status,
      writer: item.writer.name,
      createdDate: item.createdDate,
    };
  });

  const currentPage = pageable.page + 1;
  const totalPages =
    Math.floor(documents.total / documents.pageable.size) +
    (documents.total % documents.pageable.size > 0 ? 1 : 0);

  const [condition, setCondition] = useState<SearchCondition>({
    ...defaultCondition,
  });

  useLayoutEffect(() => {
    handlePageChange(1);
  }, []);

  const resetConditionHandler = () => {
    setCondition({ ...defaultCondition });
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
          <DocumentTypeSelect
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
        <DocumentTableList headers={headers} dataList={dataList} />
      </div>

      {/* pagination */}
      <div className="mt-4 grid grid-rows-2 justify-center items-center">
        <DocumentPagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
