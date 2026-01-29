// import { api } from "../api/api";

// export const register = (data) => api.post("auth/register", data);

// export const login = (data) => api.post("auth/login", data);

// export const verifyOTP = (data) => api.post("auth/verify-account", data);

// export const googleAuth = (data) => api.post("auth/google", data);
export const API_BASE_URL = import.meta.env.PROD
  ? "/api" // على Vercel
  : "http://sarahne.eu-4.evennode.com"; // على localhost
