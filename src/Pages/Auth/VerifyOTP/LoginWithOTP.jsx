import { Alert } from "@heroui/react";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { AuthContext } from "../../../Context/AuthContext";
import Login from "./Login";
import VerifyOTP from "./VerifyOTP";

// Schemas
const loginSchema = z.object({
  email: z.string().email("Invalid Email Address"),
  password: z
    .string()
    .min(8)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#]).+$/, {
      message:
        "Password must contain uppercase, lowercase, number & special character",
    }),
});

const otpSchema = z.object({
  otp: z.string().length(6, { message: "OTP must be 6 digits" }),
});

export default function LoginWithOTP() {
  const navigate = useNavigate();
  const { setToken } = useContext(AuthContext);

  const [apiError, setApiError] = useState(null);
  const [showOTP, setShowOTP] = useState(false);
  const [emailForOTP, setEmailForOTP] = useState("");

  const loginForm = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const otpForm = useForm({
    resolver: zodResolver(otpSchema),
  });

  // Login
  const onLogin = async (data) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/auth/login`,
        data,
      );

      localStorage.setItem("token", res.data.data.accessToken);
      setToken(res.data.data.accessToken);
      navigate("/dashboard");
    } catch (error) {
      const msg = error.response?.data?.error;

      if (msg === "User Not Confirm Please Verify Your Account") {
        setShowOTP(true);
        setEmailForOTP(data.email);
        setApiError("Enter the OTP sent to your email");
      } else {
        setApiError(msg || "Something went wrong");
      }
    }
  };

  // OTP
  const onOTPSubmit = async (data) => {
    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/verify-account`, {
        email: emailForOTP,
        otp: data.otp,
      });

      const password = document.getElementById("passwordInput")?.value;

      const loginRes = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/auth/login`,
        {
          email: emailForOTP,
          password,
        },
      );

      setToken(loginRes.data.data.accessToken);
      navigate("/dashboard");
    } catch {
      setApiError("OTP verification failed");
    }
  };

  return (
    <section className="min-h-screen flex justify-center items-center bg-[#070a10]">
      <div className="w-full max-w-md p-8 rounded-2xl bg-white/5 border border-white/10">
        {apiError && <Alert color="danger" variant="faded" title={apiError} />}

        {!showOTP ? (
          <Login
            onSubmit={loginForm.handleSubmit(onLogin)}
            register={loginForm.register}
            errors={loginForm.formState.errors}
            isSubmitting={loginForm.formState.isSubmitting}
            isValid={loginForm.formState.isValid}
          />
        ) : (
          <VerifyOTP
            onSubmit={otpForm.handleSubmit(onOTPSubmit)}
            register={otpForm.register}
            errors={otpForm.formState.errors}
          />
        )}
      </div>
    </section>
  );
}
