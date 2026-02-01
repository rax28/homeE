import { axiosInstance } from "./axios";

export const fetchRestock = () => axiosInstance.get("/restock");