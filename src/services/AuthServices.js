import api from "../lib/api";

export const registerServices = async (data) => {
  const response = await api.post("/auth/signup", data);
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

export const verifyOTP = async (data) => {
  const response = await api.patch("/auth/confirm-email", data);
  return response.data;
};

export const resendOTP = async (email) => {
  const response = await api.patch("/auth/resend-confirm-email", { email });
  return response.data;
};

// 1. Request OTP
export const requestForgotPasswordCode = async (email) => {
  const response = await api.post("/auth/request-forgot-password-code", {
    email,
  });
  return response.data;
};

// 2. Verify OTP
export const verifyForgotPasswordCode = async (data) => {
  const response = await api.patch("/auth/verify-forgot-password-code", data);
  return response.data;
};

// 3. Resend OTP
export const resendForgotPasswordCode = async (email) => {
  const response = await api.patch("/auth/resend-forgot-password-code", {
    email,
  });
  return response.data;
};

// 4. Reset Password
export const resetPassword = async (data) => {
  const response = await api.patch("/auth/resend-forgot-password-code", {
    email: data.email,
    otp: data.otp,
    password: data.password,
    confirmPassword: data.password,
  });
  return response.data;
};
