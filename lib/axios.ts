// lib/axios.ts
import axios from "axios";
import { API_BASE_URL, STORAGE_KEYS } from "@/config/constants";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Attach Token
apiClient.interceptors.request.use((config) => {
  // Replace with your secure token retrieval method (e.g., cookies)
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem(STORAGE_KEYS.TOKEN)
      : null;
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response Interceptor: Handle 401s and Refresh Token
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If error is 401 and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // Implement your refresh token logic here
        // const newToken = await axios.post('/api/refresh-token');
        // localStorage.setItem(STORAGE_KEYS.TOKEN, newToken.data.token);
        // return apiClient(originalRequest);
      } catch (refreshError) {
        // Handle failed refresh (e.g., logout user)
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);
