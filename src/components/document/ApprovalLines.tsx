import { DocumentsStatus } from '@/store/document/types';
import ApproveStamp from './ApproveStamp';
import RejectStamp from './RejectStamp';
import { Tooltip } from 'flowbite-react';
import { format } from 'date-fns';

export type ApprovalLine = {
  id: number;
  positionName: string;
  status: DocumentsStatus;
  approveDate?: Date;
  reason?: string;
};

type ApprovalLinesProps = {
  lines: ApprovalLine[];
};

const Stamp = ({
  status,
  approveDate,
  reason,
}: {
  status?: DocumentsStatus;
  approveDate?: Date;
  reason?: string;
}) => {
  if (!status || !approveDate) {
    return null;
  }

  return (
    <div className="grid justify-center items-center">
      <Tooltip
        content={
          <div>
            <p>{format(new Date(approveDate), 'yyyy-MM-dd HH:mm:ss')}</p>
            <p>{reason}</p>
          </div>
        }
        placement="bottom"
      >
        {status === 'APPROVE' && <ApproveStamp />}
        {status === 'REJECT' && <RejectStamp />}
      </Tooltip>
    </div>
  );
};

export default function ApprovalLines({ lines }: ApprovalLinesProps) {
  return (
    <table className="text-center w-30 ">
      <tbody className="">
        <tr className="">
          <td rowSpan={2} className="w-[20px] px-3 border border-black">
            결 제
          </td>
          {lines.map((line) => (
            <td
              key={`head_${line.id}`}
              className="w-[100px] px-3 border border-black pb-2"
            >
              {line.positionName}
            </td>
          ))}
          <td rowSpan={2} className="w-[20px] px-3 border border-black">
            승 인
          </td>
          <td className="w-[100px] px-3 border border-black pb-2">대표이사</td>
        </tr>
        <tr className="h-[80px]">
          {lines.map((line) => (
            <td key={`body_${line.id}`} className="border border-black">
              <Stamp
                status={line.status}
                approveDate={line.approveDate}
                reason={line.reason}
              />
            </td>
          ))}
          <td className="border border-black"></td>
        </tr>
      </tbody>
    </table>
  );
}
