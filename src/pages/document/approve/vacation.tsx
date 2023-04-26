import { useLayoutEffect, useState } from 'react';
import { IoChevronBackSharp } from 'react-icons/io5';
import { Button, Card } from 'flowbite-react';
import { format } from 'date-fns';

import { useRouter } from 'next/router';

import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook';
import { documentActions } from '@/store/document';
import { documentApprovalActions } from '@/store/document/approval';
import { VacationSubType, VacationType } from '@/store/document/types';

const { requestGetVacationDocument } = documentActions;
const { requestGetApproval } = documentApprovalActions;

const vacationTypes: DocumentCondtionSelect[] = [
  {
    id: 'GENERAL',
    name: '연차',
  },
  {
    id: 'GENERAL',
    name: '연차',
  },
];

const vacationSubTypes: DocumentCondtionSelect[] = [
  {
    id: 'AM',
    name: '오전',
  },
  {
    id: 'PM',
    name: '오후',
  },
];

function parseType(id: VacationType) {
  return vacationTypes.find((item) => item.id == id)?.name;
}

function parseSubType(id: VacationSubType) {
  return vacationSubTypes.find((item) => item.id == id)?.name;
}

export default function DocumentVacationApproval() {
  const router = useRouter();
  const disaptch = useAppDispatch();
  const { approval } = useAppSelector((state) => state.documentApproval);
  const { vacationDocument } = useAppSelector((state) => state.document);

  useLayoutEffect(() => {
    const { approvalId } = router.query;

    disaptch(requestGetApproval({ approvalId: Number(approvalId) }));
  }, []);

  useLayoutEffect(() => {
    if (!approval) {
      return;
    }

    disaptch(
      requestGetVacationDocument({
        documentId: approval.document.id,
      }),
    );
  }, [approval != null]);

  const handleBackDrop = () => {
    router.back();
  };

  if (!vacationDocument) {
    return;
  }

  return (
    <div className="w-full h-full">
      <div className="grid grid-cols-1">
        {/* title */}
        <div>
          <div className="inline-block">
            <Button
              size="xl"
              gradientDuoTone="whiteToWhite"
              onClick={handleBackDrop}
            >
              <IoChevronBackSharp />
            </Button>
          </div>

          <span className="text-xl font-semibold ml-2">결제</span>
        </div>

        {/* buttons */}
        <div>
          <div className="grid grid-cols-2 gap-10 mt-3">
            <Button
              outline
              color="light"
              disabled={approval?.status !== 'WAITING'}
            >
              반려
            </Button>
            <Button disabled={approval?.status !== 'WAITING'}>승인</Button>
          </div>
        </div>

        {/* contents */}
        <Card className="mt-4">
          <div className="m-20 grid grid-col-1 gap-6">
            <div className="flex w-full justify-center items-center m-10">
              <h3 className="text-3xl tracking-widest font-bold">휴 가 계</h3>
            </div>
            <div>
              <div className="inline-block w-32 text-right mr-2 text-lg">
                문 서 번 호 :
              </div>
              <span className="ml-10 text-xl font-medium">
                {vacationDocument.id}
              </span>
            </div>
            <div>
              <div className="inline-block w-32 text-right mr-2 text-lg">
                성 명 :
              </div>
              <span className="ml-10 text-xl font-medium">
                {vacationDocument.writer.name}
              </span>
            </div>
            <div>
              <div className="inline-block w-32 text-right mr-2 text-lg">
                부 서 :
              </div>
              <span className="ml-10 text-xl font-medium">dummy</span>
            </div>
            <div>
              <div className="inline-block w-32 text-right mr-2 text-lg">
                직 급 :
              </div>
              <span className="ml-10 text-xl font-medium">
                {vacationDocument.writer.position?.name}
              </span>
            </div>
            <div>
              <div className="inline-block w-32 text-right mr-2 text-lg">
                휴 가 기 간 :
              </div>
              <span className="ml-10 text-xl font-normal tracking-widest">
                <span>
                  {vacationDocument.daysCount > 1
                    ? `${format(
                        new Date(vacationDocument.vacationDateFrom),
                        'yyyy. MM. dd',
                      )} ~ ${format(
                        new Date(vacationDocument.vacationDateTo),
                        'yyyy. MM. dd',
                      )}`
                    : format(
                        new Date(vacationDocument.vacationDateFrom),
                        'yyyy. MM. dd',
                      )}
                </span>
                <span className="ml-4">
                  ( {`${vacationDocument.daysCount} 일`} )
                </span>
              </span>
            </div>
            <div>
              <div className="inline-block w-32 text-right mr-2 text-lg">
                휴 가 구 분 :
              </div>
              <span className="ml-10 text-xl font-medium">
                <span>{parseType(vacationDocument.vacationType)}</span>
                {vacationDocument.vacationSubType && (
                  <span className="ml-4">
                    ( {parseSubType(vacationDocument.vacationSubType)} )
                  </span>
                )}
              </span>
            </div>
            <div>
              <div className="inline-block w-32 text-right mr-2 text-lg">
                사 유 :
              </div>
              <span className="ml-10 text-xl">{vacationDocument.reason}</span>
            </div>
            <div className="flex w-full justify-center items-center m-20">
              <h4 className="text-xl font-semibold">
                위와 같이 신청하오니 재가 바랍니다.
              </h4>
            </div>

            <div className="text-right text-xl tracking-widest">
              <div className="inline-block w-32 mr-2">신 청 일 :</div>
              <div className="inline-block w-64">
                {format(
                  new Date(vacationDocument.createdDate),
                  'yyyy 년 MM 월 dd 일',
                )}
              </div>
            </div>
            <div className="text-right text-xl tracking-widest">
              <div className="inline-block w-32 mr-2">신 청 자 :</div>
              <div className="tracking-wide w-48 inline-block">
                <span className="font-bold">
                  사 용 자 <span className="font-normal ml-10">(인)</span>
                </span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
