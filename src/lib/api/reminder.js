import { axiosInstance } from "./axios";

export const fetchReminders = () => axiosInstance.get("/reminder/packets");
export const confirmPacketFinished = (id) => 
  axiosInstance.post(`/reminder/packets/${id}/finished`);
