import DataTable from "../../components/DataTable/DataTable";
import Filters from "../../components/Filters/Filters";
import Navigation from "../../components/Navigation/Navigation";
import Pagination from "../../components/Pagination/Pagination";
import "./Users.css";

const Users = () => {
  return (
    <div>
      <Navigation pageName="Users" />
      <Filters />
      <DataTable />
      <Pagination />
    </div>
  );
};

export default Users;
