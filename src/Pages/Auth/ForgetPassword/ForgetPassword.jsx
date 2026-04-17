import { Button, Input, Form, Alert } from "@heroui/react";
import { FaEnvelope, FaArrowLeft } from "react-icons/fa";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { requestForgotPasswordCode } from "../../../services/AuthServices";
export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [apiError, setApiError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setApiError("Please enter your email");
      return;
    }

    try {
      setIsLoading(true);
      setApiError(null);

      await requestForgotPasswordCode(email);

      setSuccess(true);

      setTimeout(() => {
        navigate("/reset-password", {
          state: { email },
        });
      }, 800);
    } catch (error) {
      setApiError(
        error.response?.data?.error_message ||
          error.response?.data?.message ||
          "Something went wrong",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative bg-[#070a10] min-h-screen flex justify-center items-center overflow-hidden">
      {/* Glow */}
      <div className="pointer-events-none absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgb(0,27,136)_0%,transparent_70%)] blur-2xl" />
      <div className="pointer-events-none absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgb(0,27,136)_0%,transparent_70%)] blur-3xl" />

      <div className="relative z-10 w-full max-w-md rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-xl">
        {/* Header */}
        <h1 className="logo-gradient text-center">Forgot Password</h1>
        <p className="mt-2 text-center text-sm text-gray-400">
          Enter your email and we’ll send you a reset link
        </p>

        {/* Alerts */}
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
            title="Reset link sent successfully, check your email"
          />
        )}

        {/* Form */}
        <Form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <Input
            label="Email Address"
            labelPlacement="outside"
            placeholder="Enter your email"
            type="email"
            variant="faded"
            startContent={<FaEnvelope className="text-blue-400" />}
            classNames={{
              inputWrapper: "bg-white/5 border border-white/10 text-white",
            }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />

          <Button
            type="submit"
            isLoading={isLoading}
            className="bg-blue-600/80 hover:bg-blue-600 text-white"
          >
            Send Reset Link
          </Button>
        </Form>

        {/* Back to login */}
        <div className="mt-6 flex justify-center">
          <Link
            to="/login"
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition"
          >
            <FaArrowLeft />
            Back to login
          </Link>
        </div>
      </div>
    </section>
  );
}
