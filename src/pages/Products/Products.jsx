import { useContext, useEffect, useState } from "react";
import { fetchProducts } from "../../api/apiService";
import { DataContext } from "../../contexts/DataContext";
import DataTable from "../../components/DataTable/DataTable";
import Filters from "../../components/Filters/Filters";
import Pagination from "../../components/Pagination/Pagination";
import "./Products.css"; // Import the CSS file
import { Link } from "react-router-dom";

const Products = () => {
  const { products, setProducts, total, setTotal, filters, setFilters } =
    useContext(DataContext);
  const [searchQuery, setSearchQuery] = useState(""); // State for search value
  const [filtersInitialized, setFiltersInitialized] = useState(false); // To track if filters have been initialized

  // Reset filters when the Products page is visited initially
  useEffect(() => {
    if (!filtersInitialized) {
      setFilters({
        searchQuery: "",
        pageSize: 5,
        page: 1,
        otherFilters: {},
      });
      setProducts([]); // Clear the products list on first load
      setFiltersInitialized(true); // Mark filters as initialized
    }
  }, [filtersInitialized, setFilters, setProducts]);

  // Fetch products whenever filters change (only after filters have been initialized)
  useEffect(() => {
    if (filtersInitialized) {
      const fetchData = async () => {
        const data = await fetchProducts(filters);
        setProducts(data.products);
        setTotal(data.total);
      };
      fetchData();
    }
  }, [filters, setProducts, setTotal, filtersInitialized]);

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
  const filteredProducts = searchQuery
    ? products.filter((product) =>
        Object.values(product).some((value) =>
          String(value).toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    : products;

  // Filter fields for Products page
  const productFilterFields = ["apiQuery"];

  return (
    <div>
      <div className="navigation">
        <Link to="/">Home</Link>
        <span className="rectangle-behind">&nbsp;/ Products</span>
      </div>
      <Filters
        onFilterChange={handleFilterChange}
        filterFields={productFilterFields}
      />
      <DataTable data={filteredProducts} />
      <Pagination totalItems={total} />
    </div>
  );
};

export default Products;
