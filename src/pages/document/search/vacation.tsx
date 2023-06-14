import { FormEvent, useEffect, useState } from 'react';
import { Button, Card, Modal, Spinner } from 'flowbite-react';
import { IoChevronBackSharp } from 'react-icons/io5';
import { FiDownload, FiPrinter } from 'react-icons/fi';
import { MdOutlineCancel } from 'react-icons/md';

import { useRouter } from 'next/router';

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook';

import { documentActions } from '@/store/document';
import { VacationDocument } from '@/components/document';

const { requestGetVacationDocument, requestCancelDocument } = documentActions;

export default function VacationDocumentList() {
  // router
  const router = useRouter();

  // redux
  const disaptch = useAppDispatch();
  const { vacationDocument } = useAppSelector((state) => state.document);

  // useState
  const [isPrinting, setIsPrinting] = useState<boolean>(false);
  const [showConfirmCancel, setShowConfirmCancel] = useState<boolean>(false);

  // useEffect
  useEffect(() => {
    const { documentId } = router.query;

    const id = Number(documentId);

    if (!id) {
      return;
    }

    disaptch(
      requestGetVacationDocument({
        documentId: id,
      }),
    );
  }, []);

  if (!vacationDocument) {
    return;
  }

  // handle
  const handleBackDrop = () => {
    router.back();
  };

  const handleCapture = () => {
    const docElement = document.getElementById('vacationDocument');
    if (!docElement) {
      return;
    }
    html2canvas(docElement).then((canvas) => {
      const pdf = new jsPDF('p', 'mm', 'a4');
      pdf.addImage(canvas, 'JPEG', 0, 0, 210, 297);
      pdf.save(`${vacationDocument.id}_${vacationDocument.writer.name}.pdf`);
    });
  };

  const handlePrint = () => {};

  const handleCancel = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { documentId } = router.query;

    if (!documentId) {
      return;
    }

    disaptch(
      requestCancelDocument({
        documentId: Number(documentId),
        handleAfter: () => {
          router.push('/document/search');
        },
      }),
    );
  };

  return (
    <>
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

            <span className="text-xl font-semibold ml-2">상세</span>
          </div>

          {/* buttons */}
          <div>
            <div className="grid grid-cols-3 gap-10 mt-3 justify-end">
              <Button color="dark" onClick={handlePrint} disabled>
                {isPrinting ? (
                  <>
                    <Spinner
                      className="mr-2 h-5 w-5"
                      color="info"
                      aria-label="Info spinner example"
                    />
                    인쇄중
                  </>
                ) : (
                  <>
                    <FiPrinter className="mr-2 h-5 w-5" size="" />
                    인쇄
                  </>
                )}
              </Button>

              <Button
                onClick={handleCapture}
                disabled={vacationDocument.status === 'CANCEL'}
              >
                <FiDownload className="mr-2 h-5 w-5" />
                PDF 다운로드
              </Button>

              <Button
                onClick={() => setShowConfirmCancel(true)}
                color="failure"
                disabled={vacationDocument.status === 'CANCEL'}
              >
                <MdOutlineCancel className="mr-2 h-5 w-5" />
                취소
              </Button>
            </div>
          </div>

          {/* contents */}
          <Card className="mt-4 relative">
            {vacationDocument.status === 'CANCEL' && (
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
      <Modal
        show={showConfirmCancel}
        onClose={() => setShowConfirmCancel(false)}
        dismissible
      >
        <form onSubmit={handleCancel}>
          <Modal.Header>취소 할꺼야?</Modal.Header>
          <Modal.Footer className="">
            <div className="grid grid-cols-2 gap-2 justify-end items-end w-full">
              <Button color="gray" onClick={() => setShowConfirmCancel(false)}>
                안할꺼야
              </Button>
              <Button type="submit">할꺼야</Button>
            </div>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}
