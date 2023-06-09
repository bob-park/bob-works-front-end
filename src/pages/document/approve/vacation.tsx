import { useEffect, useState } from 'react';
import { IoChevronBackSharp } from 'react-icons/io5';
import { Button, Card } from 'flowbite-react';

import { useRouter } from 'next/router';

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook';
import { documentActions } from '@/store/document';
import { documentApprovalActions } from '@/store/document/approval';
import { ApprovalModal, VacationDocument } from '@/components/document';

const { requestGetVacationDocument } = documentActions;
const { requestGetApproval, requestApproveDocument } = documentApprovalActions;

export default function DocumentVacationApproval() {
  // router
  const router = useRouter();

  // redux
  const disaptch = useAppDispatch();
  const { approval } = useAppSelector((state) => state.documentApproval);
  const { vacationDocument } = useAppSelector((state) => state.document);

  // state
  const [showApproval, setShowApproval] = useState<boolean>(false);
  const [isReject, setIsReject] = useState<boolean>(false);

  useEffect(() => {
    const { approvalId } = router.query;

    approvalId &&
      disaptch(requestGetApproval({ approvalId: Number(approvalId) }));
  }, []);

  useEffect(() => {
    if (!approval) {
      return;
    }

    disaptch(
      requestGetVacationDocument({
        documentId: approval.document.id,
      }),
    );
  }, [approval != null]);

  // handle
  const handleBackDrop = () => {
    router.back();
  };

  const handleApprove = (reason?: string) => {
    if (!approval) {
      return;
    }

    disaptch(
      requestApproveDocument({
        id: approval.id,
        status: isReject ? 'REJECT' : 'APPROVE',
        reason,
        handleAfter: () => {
          router.push('/document/approve/list');
        },
      }),
    );
  };

  if (!vacationDocument) {
    return;
  }

  const handleOpenApproveModal = () => {
    setIsReject(false);
    setShowApproval(true);
  };

  const handleOpenRejectModal = () => {
    setIsReject(true);
    setShowApproval(true);
  };

  return (
    <>
      <ApprovalModal
        show={showApproval}
        isReject={isReject}
        onClose={() => setShowApproval(false)}
        onApprove={handleApprove}
      />
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

            <span className="text-xl font-semibold ml-2">결재</span>
          </div>

          {/* buttons */}
          <div>
            <div className="grid grid-cols-2 gap-10 mt-3">
              <Button
                outline
                color="light"
                disabled={approval?.status !== 'WAITING'}
                onClick={handleOpenRejectModal}
              >
                반려
              </Button>
              <Button
                disabled={approval?.status !== 'WAITING'}
                onClick={handleOpenApproveModal}
              >
                승인
              </Button>
            </div>
          </div>

          {/* contents */}
          <Card className="mt-4 relative">
            {approval?.status === 'CANCEL' && (
              <div className="absolute top-0 bottom-0 w-full h-ful">
                <div className="grid place-content-center w-full h-full opacity-50">
                  <div className="text-red-700 font-black text-9xl tracking-widest -rotate-45 border-8 border-solid border-red-700 rounded p-10">
                    취 소
                  </div>
                </div>
              </div>
            )}
            <VacationDocument document={vacationDocument} />
          </Card>
        </div>
      </div>
    </>
  );
}
