import { ReactNode } from 'react';
import { Checkbox, Table } from 'flowbite-react';

type DocumentTableHeader = {
  id: string;
  value: string;
  parse?: (input: any) => any;
};

type DocumentTableListProps = {
  headers: DocumentTableHeader[];
  dataList?: any[];
  onRowClick?: (id: number) => void;
};

export default function DocumentTableList({
  headers,
  dataList,
  onRowClick,
}: DocumentTableListProps) {
  const handleRowClick = (id: number) => {
    onRowClick && onRowClick(id);
  };

  return (
    <Table hoverable>
      <Table.Head>
        <Table.HeadCell className="!p-4">
          <Checkbox />
        </Table.HeadCell>
        {headers.map((header) => (
          <Table.HeadCell key={header.id}>{header.value}</Table.HeadCell>
        ))}
      </Table.Head>
      <Table.Body className="divide-y">
        {dataList?.map((data: any) => (
          <Table.Row key={data.id} onClick={() => handleRowClick(data.id)}>
            <Table.HeadCell className="!p-4">
              <Checkbox />
            </Table.HeadCell>
            {headers.map((header) => (
              <Table.Cell key={`${header.id}_${data.id}`}>
                {header.parse && data[header.id]
                  ? header.parse(data[header.id])
                  : data[header.id]}
              </Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}
