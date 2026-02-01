import { axiosInstance } from "./axios";

export const fetchItems = () => axiosInstance.get("/items");
export const getItemById = (id) => axiosInstance.get(`/items/${id}`);
export const deleteItem = (id) => axiosInstance.delete(`/items/${id}`);