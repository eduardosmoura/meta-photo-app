import React from 'react';

export interface PaginationProps {
  totalItems: number;
  currentLimit: number;
  currentOffset: number;
  onLimitChange: (limit: number) => void;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  currentLimit,
  currentOffset,
  onLimitChange,
  onPageChange
}) => {
  const totalPages = Math.ceil(totalItems / currentLimit);
  const currentPage = Math.floor(currentOffset / currentLimit) + 1;

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onLimitChange(parseInt(e.target.value, 10));
  };

  return (
    <div className="mt-4 flex flex-col items-center justify-between md:flex-row">
      <div className="flex items-center gap-2">
        <label className="font-medium" htmlFor="limit">
          Page Size:
        </label>
        <select
          id="limit"
          value={currentLimit}
          onChange={handleLimitChange}
          className="border p-2"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="rounded border p-2 disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="rounded border p-2 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};
