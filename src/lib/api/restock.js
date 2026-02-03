import { axiosInstance } from "./axios";

export const fetchRestock = () => axiosInstance.get("/restock");
export const deleteRestockItem = (id) => axiosInstance.post("/restock/delete", { id });