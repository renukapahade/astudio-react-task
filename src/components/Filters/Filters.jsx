import { useState, useContext, useRef } from "react";
import { DataContext } from "../../contexts/DataContext";
import "./Filters.css"; // Import CSS file for filters
import "@fortawesome/fontawesome-free/css/all.min.css"; // Import Font Awesome CSS
import { toTitleCase } from "../../utils/utility";

const Filters = ({ onFilterChange, filterFields = [] }) => {
  const { filters, setFilters } = useContext(DataContext);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchValue, setSearchValue] = useState(""); // For client-side search
  const [inputValues, setInputValues] = useState(
    filterFields.reduce((acc, field) => ({ ...acc, [field]: "" }), {})
  ); // Local state for inputs

  // Create refs dynamically for each input field
  const inputRefs = useRef(
    filterFields.reduce((acc, field) => ({ ...acc, [field]: null }), {})
  );

  //Client-side search
  const handleSearch = (e) => {
    setSearchValue(e.target.value);
    onFilterChange(e.target.value); // Pass search value to the parent
  };

  const handlePageSizeChange = (e) => {
    const newSize = parseInt(e.target.value, 10);
    setFilters((prev) => ({ ...prev, pageSize: newSize }));
    onFilterChange();
  };

  // Handle filter field change on Enter key press - API call
  const handleKeyPress = (e, field) => {
    if (e.key === "Enter") {
      const value = inputValues[field];

      setFilters((prev) => ({
        ...prev,
        [field]: value, // Keep the current field value
        page: 1, // Reset to page 1 on any filter change
        ...filterFields.reduce((acc, f) => {
          if (f !== field) {
            acc[f] = ""; // Reset all other filters
            setInputValues((prev) => ({ ...prev, [f]: "" })); // Clear local state for other fields
          }
          return acc;
        }, {}),
      }));
      onFilterChange(); // Trigger API call after changing filters
    }
  };

  // Handle input changes locally without updating the global state (filters)
  const handleInputChange = (e, field) => {
    const value = e.target.value;

    setInputValues((prev) => ({
      ...prev,
      [field]: value, // Update local input values
    }));
  };

  return (
    <div className="filters-container">
      <div>
        <select value={filters.pageSize} onChange={handlePageSizeChange}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
        <label>Entries</label>
      </div>
      <span className="separator"></span>
      <div className="search-filter">
        <button
          onClick={() => setSearchVisible(!searchVisible)}
          className="icon-button"
        >
          <i className="fas fa-search"></i>
        </button>
        {searchVisible && (
          <input
            type="text"
            placeholder="Local Search"
            value={searchValue}
            onChange={handleSearch}
          />
        )}
      </div>
      <span className="separator"></span>
      {/* Dynamic Filter Fields */}
      {filterFields.map((field) => (
        <div key={field} className="filter-group">
          <input
            ref={(el) => (inputRefs.current[field] = el)} // Assign ref to each input dynamically
            type="text"
            placeholder={`Filter by ${toTitleCase(field)}`}
            value={inputValues[field]} // Controlled input with local state
            onChange={(e) => handleInputChange(e, field)} // Update local input value
            onKeyDown={(e) => handleKeyPress(e, field)} // Trigger API call on Enter
          />
        </div>
      ))}
    </div>
  );
};

export default Filters;
