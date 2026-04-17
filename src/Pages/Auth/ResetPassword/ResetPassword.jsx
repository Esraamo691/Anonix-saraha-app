import { Alert, Button, Form, Input } from "@heroui/react";
import { FaEnvelope, FaLock, FaKey } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  requestForgotPasswordCode,
  resendForgotPasswordCode,
  resetPassword,
} from "../../../services/AuthServices";
import { InputOtp } from "@heroui/react";
import { toast } from "react-toastify";
export default function ResetPassword() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [email, setEmail] = useState(state?.email || "");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");

  const [apiError, setApiError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#])[A-Za-z\d@$!%*?&^#]{8,}$/;

  useEffect(() => {
    if (!state?.email) {
      navigate("/forget-password");
    }
  }, [state, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !otp || !password) {
      setApiError("All fields are required");
      return;
    }

    if (!/^\d{6}$/.test(otp)) {
      setApiError("OTP must be 6 digits");
      return;
    }

    if (!passwordRegex.test(password)) {
      setApiError(
        "Password must have at least 8 characters, including uppercase, lowercase, number and special character",
      );
      return;
    }

    try {
      setIsLoading(true);
      setApiError(null);

      await resetPassword({
        email,
        otp,
        password,
      });

      setSuccess("Password reset successfully. You can login now");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      const msg =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Reset password failed";

      if (msg.toLowerCase().includes("expired")) {
        setApiError("OTP expired, please request a new one");
      } else {
        setApiError(msg);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      setApiError(null);
      await requestForgotPasswordCode(email);
      toast.success("OTP resent successfully");
    } catch (error) {
      setApiError(
        error.response?.data?.error_message || "Failed to resend code",
      );
    }
  };

  return (
    <section className="relative bg-[#070a10] min-h-screen flex justify-center items-center overflow-hidden">
      {/* Glow */}
      <div className="pointer-events-none absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgb(0,27,136)_0%,transparent_70%)] blur-2xl" />
      <div className="pointer-events-none absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgb(0,27,136)_0%,transparent_70%)] blur-3xl" />

      <div className="relative z-10 w-full max-w-md rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-xl">
        <h1 className="logo-gradient text-center">Reset Password</h1>
        <p className="mt-2 text-center text-sm text-gray-400">
          Enter the OTP sent to your email and set a new password
        </p>

        {apiError && (
          <Alert
            className="mt-4"
            variant="faded"
            color="danger"
            title={apiError}
          />
        )}

        {success && (
          <Alert
            className="mt-4"
            variant="faded"
            color="success"
            title={success}
          />
        )}

        <Form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <Input
            label="Email"
            labelPlacement="outside"
            type="email"
            variant="faded"
            startContent={<FaEnvelope className="text-blue-400" />}
            classNames={{
              inputWrapper: "bg-white/5 border border-white/10 text-white",
            }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={!!state?.email || isLoading}
          />

          {/* <Input
            label="OTP Code"
            labelPlacement="outside"
            placeholder="Enter 6-digit OTP"
            variant="faded"
            startContent={<FaKey className="text-purple-400" />}
            classNames={{
              inputWrapper: "bg-white/5 border border-white/10 text-white",
            }}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            disabled={isLoading}
          /> */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-400">OTP Code</label>

            <InputOtp
              color="primary"
              variant="bordered"
              length={6}
              value={otp}
              onValueChange={setOtp}
              isDisabled={isLoading}
              classNames={{
                segment: "bg-white/5 border border-white/10 text-white",
              }}
            />
          </div>
          <Input
            label="New Password"
            labelPlacement="outside"
            type="password"
            placeholder="Enter new password"
            variant="faded"
            startContent={<FaLock className="text-green-400" />}
            classNames={{
              inputWrapper: "bg-white/5 border border-white/10 text-white",
            }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />

          <Button
            type="submit"
            isLoading={isLoading}
            className="mt-2 bg-blue-600/80 hover:bg-blue-600 text-white"
          >
            Reset Password
          </Button>
        </Form>

        {/* 🔥 زرار resend */}
        <div className="mt-4 text-center">
          <button
            onClick={handleResend}
            className="text-sm text-gray-400 hover:text-white underline"
          >
            Resend OTP
          </button>
        </div>
      </div>
    </section>
  );
}
