import { FC } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number, isDirectPage?: boolean) => void;
  hasNext: boolean;
  hasPrev: boolean;
}

const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  hasNext,
  hasPrev,
}) => {
  return (
    <div className="flex pt-10 justify-center gap-3">
      <div className="w-16 justify-end flex">
        <button
          onClick={() => onPageChange(-1)}
          className={`${hasPrev ? "visible" : "invisible"}`}
        >
          Prev
        </button>
      </div>

      {totalPages > 0 && (
        <>
          {currentPage > 2 && (
            <>
              <button
                className="w-8 text-center"
                onClick={() => onPageChange(0, true)}
              >
                1
              </button>
              <span className="w-8 text-center">...</span>
            </>
          )}

          {[...Array(5)].map((_, index) => {
            let pageNumber;
            if (currentPage < 3) {
              pageNumber = index;
            } else if (currentPage > totalPages - 4) {
              pageNumber = totalPages - 5 + index;
            } else {
              pageNumber = currentPage - 2 + index;
            }

            if (pageNumber < 0 || pageNumber >= totalPages) return null;

            return (
              <button
                key={pageNumber}
                className={`w-8 text-center ${
                  currentPage === pageNumber ? "font-bold" : ""
                }`}
                onClick={() => onPageChange(pageNumber, true)}
              >
                {pageNumber + 1}
              </button>
            );
          })}

          {currentPage < totalPages - 3 && (
            <>
              <span className="w-8 text-center">...</span>
              <button
                className="w-8 text-center"
                onClick={() => onPageChange(totalPages - 1, true)}
              >
                {totalPages}
              </button>
            </>
          )}
        </>
      )}

      <div className="flex justify-start w-16">
        <button
          onClick={() => onPageChange(+1)}
          className={`${hasNext ? "visible" : "invisible"}`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
