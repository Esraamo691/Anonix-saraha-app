import axios from "axios";
import { baseURL } from "../consts";
import { rotateToken } from "../services/profileServices";
const api = axios.create({
  baseURL: baseURL,
  timeout: 300000,
});

api.interceptors.request.use(
  (config) => {
    try {
      const token =
        localStorage.getItem("access_token") ||
        sessionStorage.getItem("access_token");

      if (!config.headers) {
        config.headers = {};
      }

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    } catch (error) {
      console.error("Request Interceptor Error:", error);
      return config;
    }
  },
  (error) => Promise.reject(error),
);

let isRefreshing = false;

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status;
    const originalRequest = error.config;

    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;

        try {
          const result = await rotateToken();

          const newAccessToken = result.access_token;

          isRefreshing = false;

          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        } catch (err) {
          isRefreshing = false;
          localStorage.clear();
          window.location.href = "/login";
        }
      }
    }

    return Promise.reject(error);
  },
);

export const register = async (data) => {
  const response = await api.post("/auth/sign-up", data);
  return response.data;
};

export const login = async (data) => {
  const response = await api.post("/auth/login", data);

  const result = response.data?.result;

  if (result?.access_token) {
    localStorage.setItem("access_token", result.access_token);
    localStorage.setItem("refresh_token", result.refresh_token);
  }

  return response.data;
};

export const logout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
};

export default api;
