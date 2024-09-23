import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://dummyjson.com", // Should be added in .env file in production
});

export const fetchUsers = async (filters) => {
  const { page, pageSize, firstName, email, birthDate, gender } = filters;
  let query = "";

  // Apply other filters (API doesn't allow multiple filter fields, so only one can be applied at a time)
  if (firstName) query += `/filter?key=firstName&value=${firstName}`;
  else if (email) query += `/filter?key=email&value=${email}`;
  else if (birthDate) query += `/filter?key=birthDate&value=${birthDate}`;
  else if (gender) query += `/filter?key=gender&value=${gender}`;
  else query += `?`;

  query += `&page=${page}&limit=${pageSize}&skip=${(page - 1) * pageSize}`;

  const response = await axiosInstance.get(`/users${query}`);
  return response.data;
};

export const fetchProducts = async (filters) => {
  const { page, pageSize, apiQuery } = filters;
  let query = "";

  // Apply other filters (API doesn't allow multiple filter fields, so only one can be applied at a time)
  if (apiQuery) query += `/search?q=${apiQuery}`;
  else query += `?`;
  query += `&page=${page}&limit=${pageSize}&skip=${(page - 1) * pageSize}`;

  const response = await axiosInstance.get(`/products${query}`);
  return response.data;
};
