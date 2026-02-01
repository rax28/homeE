import { axiosInstance } from "./axios";

export const detectFruits = (imageBase64) =>
  axiosInstance.post("/ai/detectFruits", {
    image: imageBase64
  });