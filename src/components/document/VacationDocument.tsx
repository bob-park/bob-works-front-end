import { VacationDocument } from '@/store/document/types';
import ApprovalLines from './ApprovalLines';
import {
  formatDate,
  parseSubType,
  parseType,
} from '@/common/page/utils/commonUtils';

type VacationDocumentProps = {
  document: VacationDocument;
};

export default function VacationDocument({ document }: VacationDocumentProps) {
  const { lines, writer } = document;

  return (
    <div id="vacationDocument" className="h-[1344px]">
      <div className="m-20 grid grid-col-1 gap-8">
        <div className="grid w-full justify-end m-1">
          <ApprovalLines
            lines={lines.map((line) => {
              return {
                id: line.id,
                positionName: line.positionName,
                status: line.status,
                approveDate: line.approvedDateTime,
                reason: line.reason,
              };
            })}
          />
        </div>

        <div className="flex w-full justify-center items-center mt-16">
          <h3 className="text-4xl tracking-widest font-bold">휴 가 계</h3>
        </div>
        <div className="mt-20">
          <div className="inline-block w-32 text-right mr-2 text-lg">
            성 명 :
          </div>
          <span className="ml-10 text-xl font-medium">{writer.name}</span>
        </div>
        <div>
          <div className="inline-block w-32 text-right mr-2 text-lg">
            부 서 :
          </div>
          <span className="ml-10 text-xl font-medium">{writer.team.name}</span>
        </div>
        <div>
          <div className="inline-block w-32 text-right mr-2 text-lg">
            직 급 :
          </div>
          <span className="ml-10 text-xl font-medium">
            {writer.position?.name}
          </span>
        </div>
        <div>
          <div className="inline-block w-32 text-right mr-2 text-lg">
            휴 가 기 간 :
          </div>
          <span className="ml-10 text-xl font-normal tracking-widest">
            <span>
              {document.daysCount > 1
                ? `${formatDate(document.vacationDateFrom)} ~ ${formatDate(
                    document.vacationDateTo,
                  )}`
                : formatDate(document.vacationDateFrom)}
            </span>
            <span className="ml-4">( {`${document.daysCount} 일`} )</span>
          </span>
        </div>
        <div>
          <div className="inline-block w-32 text-right mr-2 text-lg">
            휴 가 구 분 :
          </div>
          <span className="ml-10 text-xl font-medium">
            <span>{parseType(document.vacationType)}</span>
            {document.vacationSubType && (
              <span className="ml-4">
                ( {parseSubType(document.vacationSubType)} )
              </span>
            )}
          </span>
        </div>
        <div>
          <div className="inline-block w-32 text-right mr-2 text-lg">
            사 유 :
          </div>
          <span className="ml-10 text-xl">{document.reason}</span>
        </div>
        <div className="flex w-full justify-center items-center mt-24">
          <h4 className="text-xl font-semibold">
            위와 같이 신청하오니 재가 바랍니다.
          </h4>
        </div>

        <div className="text-right text-xl tracking-widest mt-28">
          <div className="inline-block w-32 mr-2">신 청 일 :</div>
          <div className="inline-block w-64">
            {formatDate(document.createdDate, 'yyyy 년 MM 월 dd 일')}
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
  );
}
