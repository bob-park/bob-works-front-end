import DocumentTypeSearchSelect from '@/components/search/DocumentTypeSearchSelect';
import { Card, Label } from 'flowbite-react';
import { useState } from 'react';

type ApproveDocumentTypeName = DocumentsTypeName | 'ALL';

type ApproveSearchCondition = {
  type: ApproveDocumentTypeName;
};

export default function ApproveList() {
  const [condition, setCondition] = useState<ApproveSearchCondition>({
    type: 'ALL',
  });

  return (
    <div>
      {/* search condition */}
      <Card>
        <form className="grid grid-cols-4- gap-6">
          <DocumentTypeSearchSelect type={condition.type} />
        </form>
      </Card>
    </div>
  );
}
