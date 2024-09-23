import { useContext } from "react";
import { DataContext } from "../../contexts/DataContext";
import "./Pagination.css"; // Import CSS file for pagination
import "@fortawesome/fontawesome-free/css/all.min.css"; // Import Font Awesome CSS

const Pagination = ({ totalItems }) => {
  const { filters, setFilters } = useContext(DataContext);

  const totalPages = Math.ceil(totalItems / filters.pageSize);

  const handlePageChange = (page) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 6;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is less than or equal to maxVisiblePages
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            disabled={filters.page === i}
            className="page-button"
          >
            {i}
          </button>
        );
      }
    } else {
      // Always show the first and last page
      pageNumbers.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          disabled={filters.page === 1}
          className="page-button"
        >
          1
        </button>
      );

      // Calculate the range of pages to show
      const startPage = Math.max(2, filters.page - 2);
      const endPage = Math.min(totalPages - 1, filters.page + 2);

      // Add ellipsis if needed
      if (startPage > 2) {
        pageNumbers.push(<span key="ellipsis1">...</span>);
      }

      // Add the range of pages
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            disabled={filters.page === i}
            className="page-button"
          >
            {i}
          </button>
        );
      }

      // Add ellipsis if needed
      if (endPage < totalPages - 1) {
        pageNumbers.push(<span key="ellipsis2">...</span>);
      }

      // Always show the last page
      pageNumbers.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          disabled={filters.page === totalPages}
          className="page-button"
        >
          {totalPages}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="pagination-container">
      <button
        onClick={() => handlePageChange(filters.page - 1)}
        disabled={filters.page === 1}
        className="icon-button"
      >
        <i className="fas fa-chevron-left"></i>
      </button>
      {renderPageNumbers()}
      <button
        onClick={() => handlePageChange(filters.page + 1)}
        disabled={filters.page === totalPages}
        className="icon-button"
      >
        <i className="fas fa-chevron-right"></i>
      </button>
    </div>
  );
};

export default Pagination;
