import { useEffect, useState } from 'react';
import { Button, Card, Spinner } from 'flowbite-react';
import { IoChevronBackSharp } from 'react-icons/io5';
import { FiDownload, FiPrinter } from 'react-icons/fi';

import { useRouter } from 'next/router';

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook';

import { documentActions } from '@/store/document';
import { VacationDocument } from '@/components/document';

const { requestGetVacationDocument } = documentActions;

export default function VacationDocumentList() {
  // router
  const router = useRouter();

  // redux
  const disaptch = useAppDispatch();
  const { vacationDocument } = useAppSelector((state) => state.document);

  // useState
  const [isPrinting, setIsPrinting] = useState<boolean>(false);

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

          <span className="text-xl font-semibold ml-2">상세</span>
        </div>

        {/* buttons */}
        <div>
          <div className="grid grid-cols-3 gap-10 mt-3 justify-end">
            <div></div>
            <Button onClick={handleCapture}>
              <FiDownload className="mr-2 h-5 w-5" />
              PDF 다운로드
            </Button>

            <Button color="dark" onClick={handlePrint}>
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
          </div>
        </div>

        {/* contents */}
        <Card className="mt-4">
          <VacationDocument document={vacationDocument} />
        </Card>
      </div>
    </div>
  );
}
