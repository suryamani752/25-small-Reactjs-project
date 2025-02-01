import React from "react";

const PaginationPage = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <>
      <div className="flex items-center justify-center gap-2 my-6">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 text-gray-600 disabled:opacity-50 bg-green-200 rounded hover:bg-green-300 cursor-pointer"
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            onClick={() => onPageChange(index + 1)}
            className={`px-4 py-2 rounded ${
              currentPage === index + 1
                ? "bg-blue-500 text-white cursor-pointer"
                : "bg-gray-200 text-gray-600 hover:bg-gray-300 cursor-pointer"
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 text-gray-600 disabled:opacity-50 bg-green-200 rounded hover:bg-green-300 cursor-pointer"
        >
          Next
        </button>
      </div>
    </>
  );
};

export default PaginationPage;
