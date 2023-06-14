import { useLayoutEffect, useState } from 'react';
import { MdOutlineRefresh, MdSearch } from 'react-icons/md';
import { format } from 'date-fns';

import { Button, Card, Label, Table, TextInput } from 'flowbite-react';

import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook';
import {
  DocumentPagination,
  DocumentTypeSelect,
  DocumentStatusSelect,
  DocumentTableList,
} from '@/components/search';

import { documentApprovalActions } from '@/store/document/approval';
import { getTotalPages } from '@/common/page';
import { parseStatus } from '@/components/search/DocumentStatusSelect';
import { useRouter } from 'next/router';

type ApproveSearchCondition = {
  type: DocumentConditionType;
  status: DocumentConditionStatus;
  writerId?: string;
};

const { requestGetApprovals } = documentApprovalActions;

const defaultCondition: ApproveSearchCondition = {
  type: 'ALL',
  status: 'ALL',
  writerId: '',
};

const headers = [
  {
    id: 'id',
    value: '결재 번호',
  },
  {
    id: 'documentType',
    value: '문서 종류',
  },
  {
    id: 'writerId',
    value: '결재 요청자',
  },
  {
    id: 'status',
    value: '결재 상태',
    parse: (input: DocumentConditionStatus) => parseStatus(input),
  },
  {
    id: 'reason',
    value: '반려 사유',
  },
  {
    id: 'approvedDateTime',
    value: '결재일',
    parse: (input: Date) => format(new Date(input), 'yyyy-MM-dd hh:mm:ss'),
  },
];

export default function ApproveList() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { approvals } = useAppSelector((state) => state.documentApproval);

  const [condition, setCondition] = useState<ApproveSearchCondition>({
    ...defaultCondition,
  });

  const { pageable, content, total } = approvals;

  const currentPage = pageable.page + 1;
  const totalPages = getTotalPages(total, pageable.size);
  const dataList = content.map((item) => {
    return {
      id: item.id,
      documentType: item.document.documentType.name,
      writerId: item.document.writer.name,
      status: item.status,
      reason: item.reason,
      approvedDateTime: item.approvedDateTime,
    };
  });

  /* useEffect */
  useLayoutEffect(() => {
    handlePageChange(1);
  }, []);

  /* handle */
  const handleReset = () => {
    setCondition({
      ...defaultCondition,
    });
  };

  const handleDataRowClick = (id: number) => {
    const type = content.find((item) => item.id == id)?.document.documentType
      .type;

    router.push({
      pathname: `/document/approve/${type.toLowerCase()}`,
      query: {
        approvalId: id,
      },
    });
  };

  const handlePageChange = (page: number) => {
    dispatch(
      requestGetApprovals({
        ...pageable,
        page: page - 1,
      }),
    );
  };

  return (
    <div>
      {/* search condition */}
      <Card>
        <form className="grid grid-cols-4 gap-6">
          <DocumentTypeSelect
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
        <DocumentTableList
          headers={headers}
          dataList={dataList}
          onRowClick={handleDataRowClick}
        />
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
