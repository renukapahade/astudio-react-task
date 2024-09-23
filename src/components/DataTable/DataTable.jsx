import "./DataTable.css"; // Import the CSS file
import { toTitleCase } from "../../utils/utility";

const DataTable = ({ data }) => {
  const columns = data && data.length > 0 ? Object.keys(data[0]) : [];

  if (!data || data.length === 0) {
    return <p>No data available</p>;
  }

  const renderCellValue = (value) => {
    if (typeof value === "object" && value !== null) {
      value = JSON.stringify(value);
    }

    // Trim the content if it exceeds 50 characters
    if (typeof value == "string" && value.length > 50) {
      value = value.slice(0, 50) + "..."; // Trim and append "..."
    }

    return value;
  };

  return (
    <div className="table-container">
      <table className="custom-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col}>{toTitleCase(col)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              {columns.map((col) => (
                <td key={col}>{renderCellValue(item[col]) || "N/A"}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
