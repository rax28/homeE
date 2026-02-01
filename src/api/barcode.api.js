import { axiosInstance } from "./axios";

export const addFromBarcode = (barcode) =>
  axiosInstance.post("/items/from-barcode", { barcode });