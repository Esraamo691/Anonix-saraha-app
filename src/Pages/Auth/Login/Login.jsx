import { Alert, Button, Form, Input } from "@heroui/react";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ValidationError from "../../../Components/Shared/ValidationError/ValidationError";
import { AuthContext } from "../../../Context/AuthContext";
// import GoogleSignIn from "../GoogleSignIn/GoogleSignIn";

// Login Schema
const loginSchema = z.object({
  email: z.string().email("Invalid Email Address"),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#])[A-Za-z\d@$!%*?&^#]{8,}$/,
      {
        message:
          "Password must contain at least one Uppercase letter, one LowerCase letter, one number, and one special character",
      },
    ),
});

// OTP Schema
const otpSchema = z.object({
  otp: z.string().length(6, { message: "OTP must be 6 digits" }),
});

export default function LoginWithOTP() {
  const navigate = useNavigate();
  const [ApiError, setApiError] = useState(null);
  const [showOTP, setShowOTP] = useState(false);
  const [emailForOTP, setEmailForOTP] = useState("");
  const { token, setToken } = useContext(AuthContext);
  // Login Form
  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  // OTP Form
  const {
    register: otpRegister,
    handleSubmit: handleOTPSubmit,
    formState: { errors: otpErrors },
  } = useForm({ resolver: zodResolver(otpSchema) });

  // Login Handler

  const onLogin = async (data) => {
    try {
      const { data: response } = await axios.post(
        "http://sarahne.eu-4.evennode.com/auth/login",
        data,
      );

      console.log("Login Response:", response);

      if (response.data?.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        setToken(response.data.accessToken);
        setApiError(null);
        navigate("/dashboard");
      } else {
        setApiError("Token not returned from server");
      }
    } catch (error) {
      const errMsg = error.response?.data?.error;

      if (errMsg === "User Not Confirm Please Verify Your Account") {
        setShowOTP(true);
        setEmailForOTP(data.email);
        setApiError(
          "Your account is not verified. Enter OTP sent to your email.",
        );
      } else {
        setApiError(errMsg || "Something went wrong");
      }
    }
  };

  // OTP Handler
  const onOTPSubmit = async (data) => {
    try {
      setApiError(null);
      const response = await axios.post(
        "http://sarahne.eu-4.evennode.com/auth/verify-account",
        {
          email: emailForOTP,
          otp: data.otp,
        },
      );

      console.log("OTP Response:", response.data);

      if (response.data.message === "Account verified successfully") {
        // OTP verified, login automatically
        const { data: loginResponse } = await axios.post(
          "http://sarahne.eu-4.evennode.com/auth/login",
          {
            email: emailForOTP,
            password: document.getElementById("passwordInput").value,
          },
        );

        navigate("/dashboard");
      }
    } catch (error) {
      setApiError(error.response?.data?.error || "OTP verification failed");
    }
  };

  return (
    <section className="relative bg-[#070a10] min-h-screen flex justify-center items-center overflow-hidden">
      <div
        className="pointer-events-none absolute top-1/4 left-1/4 h-64 w-64 rounded-full
         bg-[radial-gradient(circle,rgb(0,27,136)_0%,transparent_70%)] blur-2xl"
      />

      <div
        className="pointer-events-none absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full
         bg-[radial-gradient(circle,rgb(0,27,136)_0%,transparent_70%)] blur-3xl"
      />
      <div className="relative z-10 w-full max-w-md rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-xl">
        <h1 className="logo-gradient text-center">Welcome To Anonix</h1>
        <p className="mt-2 text-center text-sm text-gray-400">
          {showOTP
            ? "Enter the OTP sent to your email to verify your account."
            : "Log in to read your anonymous messages."}
        </p>
        {ApiError && (
          <div className="flex mt-3 items-center justify-center w-full">
            <div className="flex flex-col w-full">
              <div className="w-full flex items-center  my-3 ">
                <Alert
                  variant="faded"
                  color="danger"
                  className="py-2"
                  title={ApiError}
                />
              </div>
            </div>
          </div>
        )}
        {!showOTP && (
          <Form
            className="mt-6 flex flex-col gap-4"
            onSubmit={handleLoginSubmit(onLogin)}
          >
            <div className="w-full">
              <Input
                {...loginRegister("email")}
                label="Email"
                labelPlacement="outside"
                placeholder="Enter your email"
                type="email"
                variant="faded"
                classNames={{
                  inputWrapper: "bg-white/5 border border-white/10 text-white",
                }}
              />
              <ValidationError error={loginErrors.email?.message} />
            </div>

            <div className="w-full">
              <Input
                {...loginRegister("password")}
                label="Password"
                labelPlacement="outside"
                placeholder="Enter your password"
                type="password"
                variant="faded"
                id="passwordInput"
                classNames={{
                  inputWrapper: "bg-white/5 border border-white/10 text-white",
                }}
              />
              <ValidationError error={loginErrors.password?.message} />
            </div>

            <div className="flex items-end justify-between w-full">
              <Button
                type="submit"
                className="mt-4 bg-blue-600/80 hover:bg-blue-600 text-white"
              >
                Login
              </Button>
              {/* <p className="bg-blue-50 text-sky-600 p-2 rounded-full">OR</p> */}
              {/* <GoogleSignIn setApiError={setApiError} /> */}
            </div>
          </Form>
        )}

        {showOTP && (
          <Form
            className="mt-6 flex flex-col gap-4"
            onSubmit={handleOTPSubmit(onOTPSubmit)}
          >
            <Input
              {...otpRegister("otp")}
              label="OTP"
              labelPlacement="outside"
              placeholder="Enter 6-digit code"
              variant="faded"
              classNames={{
                inputWrapper: "bg-white/5 border border-white/10 text-white",
              }}
            />
            <ValidationError error={otpErrors.otp?.message} />

            <Button
              type="submit"
              className="mt-4 bg-green-600/80 hover:bg-green-600 text-white"
            >
              Verify OTP
            </Button>
          </Form>
        )}
      </div>
    </section>
  );
}
