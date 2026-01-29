// axiosInstance.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://backend-express-smoky.vercel.app",
});

// Add token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Global error handler
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      error.message = "Please sign in or login to access";
    }
    return Promise.reject(error);
  }
);

export default api;
