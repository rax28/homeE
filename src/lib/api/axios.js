import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:3000/api"
      : "/api",
  withCredentials: true,
  timeout: 30000, // 30 second timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// Add response interceptor for better error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === "ECONNABORTED") {
      console.error("Request timeout");
    } else if (error.response) {
      // Server responded with error
      console.error(
        "Server error:",
        error.response.status,
        error.response.data,
      );
    } else if (error.request) {
      // Request made but no response
      console.error("No response from server");
    } else {
      console.error("Request error:", error.message);
    }
    return Promise.reject(error);
  },
);
