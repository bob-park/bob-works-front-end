import { DocumentsStatus } from '@/store/document/types';
import ApproveStamp from './ApproveStamp';
import RejectStamp from './RejectStamp';

export type ApprovalLine = {
  id: number;
  positionName: string;
  status: DocumentsStatus;
};

type ApprovalLinesProps = {
  lines: ApprovalLine[];
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
              className="w-[100px] px-3 border border-black"
            >
              {line.positionName}
            </td>
          ))}
        </tr>
        <tr className="h-[80px]">
          {lines.map((line) => (
            <td key={`body_${line.id}`} className="border border-black">
              {line.status === 'APPROVE' && <ApproveStamp />}
              {line.status === 'REJECT' && <RejectStamp />}
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
}
