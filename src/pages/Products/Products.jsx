import DataTable from "../../components/DataTable/DataTable";
import Filters from "../../components/Filters/Filters";
import Navigation from "../../components/Navigation/Navigation";
import Pagination from "../../components/Pagination/Pagination";
import "./Products.css";

const Products = () => {
  return (
    <div>
      <Navigation pageName="Products" />
      <Filters />
      <DataTable />
      <Pagination />
    </div>
  );
};

export default Products;
