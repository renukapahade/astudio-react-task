import { useContext, useEffect, useState } from "react";
import { fetchUsers } from "../../api/apiService";
import { DataContext } from "../../contexts/DataContext";
import DataTable from "../../components/DataTable/DataTable";
import Filters from "../../components/Filters/Filters";
import Pagination from "../../components/Pagination/Pagination";
import "./Users.css"; // Import the CSS file
import { Link } from "react-router-dom";

const Users = () => {
  const { users, setUsers, total, setTotal, filters, setFilters } =
    useContext(DataContext);
  const [searchQuery, setSearchQuery] = useState(""); // State for search value
  const userFilterFields = ["firstName", "email", "birthDate", "gender"]; // Filter fields for Users page
  const [filtersInitialized, setFiltersInitialized] = useState(false); // To track if filters have been initialized

  // Reset filters when the Users page is visited initially
  useEffect(() => {
    if (!filtersInitialized) {
      setFilters({
        searchQuery: "",
        pageSize: 5,
        page: 1,
        otherFilters: {},
      });
      setUsers([]); // Clear the user list on first load
      setFiltersInitialized(true); // Mark filters as initialized
    }
  }, [filtersInitialized, setFilters, setUsers]);

  // Fetch users whenever filters change (only after filters have been initialized)
  useEffect(() => {
    if (filtersInitialized) {
      const fetchData = async () => {
        const data = await fetchUsers(filters);
        setUsers(data.users);
        setTotal(data.total);
      };
      fetchData();
    }
  }, [filters, setUsers, setTotal, filtersInitialized]);

  // Function to handle the search value from Filters component
  const handleFilterChange = (query) => {
    setSearchQuery(query || "");

    // Update the global filter with search query
    setFilters((prevFilters) => ({
      ...prevFilters,
      searchQuery: query,
      page: 1, // Reset pagination on search
    }));
  };

  // Apply client-side filtering based on searchQuery
  const filteredUsers = searchQuery
    ? users.filter((user) =>
        Object.values(user).some((value) =>
          String(value).toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    : users;

  return (
    <div>
      <div className="navigation">
        <Link to="/">Home </Link>
        <span className="rectangle-behind">&nbsp;/ Users</span>
      </div>
      <Filters
        onFilterChange={handleFilterChange}
        filterFields={userFilterFields}
      />
      <DataTable data={filteredUsers} />
      <Pagination totalItems={total} />
    </div>
  );
};

export default Users;
