import { Pagination } from 'flowbite-react';

type DocumentPaginationProps = {
  totalPages: number;
  currentPage: number;
  onPageChange?: (page: number) => void;
};

export default function DocumentPagination({
  totalPages,
  currentPage,
  onPageChange,
}: DocumentPaginationProps) {
  const handlePageChange = (page: number) => {
    onPageChange && onPageChange(page);
  };

  return (
    <>
      <div className="text-center text-gray-500">
        {`총 ${totalPages} 페이지 중 `}
        <span className="font-black">{`${currentPage} 페이지`}</span>
      </div>
      <Pagination
        currentPage={currentPage}
        layout="navigation"
        onPageChange={handlePageChange}
        totalPages={totalPages}
        showIcons
        previousLabel="이전"
        nextLabel="다음"
      />
    </>
  );
}
