import { createContext, useState } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [filters, setFilters] = useState({
    searchQuery: "",
    pageSize: 5,
    page: 1,
    otherFilters: {},
  });

  const value = {
    users,
    setUsers,
    products,
    setProducts,
    total,
    setTotal,
    filters,
    setFilters,
  };
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
