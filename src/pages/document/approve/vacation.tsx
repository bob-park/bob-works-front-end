import { useLayoutEffect, useState } from 'react';
import { IoChevronBackSharp } from 'react-icons/io5';
import { Button } from 'flowbite-react';
import { format } from 'date-fns';

import { useRouter } from 'next/router';

import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook';
import { documentApprovalActions } from '@/store/document/approval';

const { requestGetApproval } = documentApprovalActions;

export default function DocumentVacationApproval() {
  const router = useRouter();
  const disaptch = useAppDispatch();
  const { approval } = useAppSelector((state) => state.documentApproval);

  const now = new Date();

  useLayoutEffect(() => {
    const { approvalId } = router.query;

    disaptch(requestGetApproval({ approvalId: Number(approvalId) }));
  }, []);

  return (
    <div className="w-full h-full">
      <div className="grid grid-cols-1">
        {/* title */}
        <div>
          <div className="inline-block">
            <Button size="xl" gradientDuoTone="whiteToWhite">
              <IoChevronBackSharp />
            </Button>
          </div>

          <span className="text-xl font-semibold ml-2">결제 승인</span>
        </div>

        {/* contents */}
        <div className="m-20 grid grid-col-1 gap-10">
          <div className="flex w-full justify-center items-center m-10">
            <h3 className="text-3xl tracking-widest font-bold">휴 가 계</h3>
          </div>
          <div>
            <div className="inline-block w-32 text-right mr-2 text-lg">
              문 서 번 호 :
            </div>
            <span className="ml-10 text-xl font-medium">
              {approval?.document.id}
            </span>
          </div>
          <div>
            <div className="inline-block w-32 text-right mr-2 text-lg">
              성 명 :
            </div>
            <span className="ml-10 text-xl font-medium">
              {approval?.document.writer.name}
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
              {approval?.document.writer.position?.name}
            </span>
          </div>
          <div>
            <div className="inline-block w-32 text-right mr-2 text-lg">
              휴 가 기 간 :
            </div>
            <span className="ml-10 text-xl font-medium"></span>
          </div>
          <div>
            <div className="inline-block w-32 text-right mr-2 text-lg">
              휴 가 구 분 :
            </div>
            <span className="ml-10 text-xl font-medium">1</span>
          </div>
          <div>
            <div className="inline-block w-32 text-right mr-2 text-lg">
              사 유 :
            </div>
            <span className="ml-10 text-xl">1</span>
          </div>
          <div className="flex w-full justify-center items-center m-20">
            <h4 className="text-xl font-semibold">
              위와 같이 신청하오니 재가 바랍니다.
            </h4>
          </div>

          <div className="text-right text-xl tracking-widest">
            <div className="inline-block w-32 mr-2">신 청 일 :</div>
            <div className="inline-block w-64">
              {format(now, 'yyyy 년 MM 월 dd 일')}
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
      </div>
    </div>
  );
}
