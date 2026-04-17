import React, { useState } from "react";
import { Form, Input, Button, Alert } from "@heroui/react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import ValidationError from "../../Components/Shared/ValidationError/ValidationError";
import { login, resendOTP, verifyOTP } from "../../services/AuthServices";
import { InputOtp } from "@heroui/react";
import { toast } from "react-toastify";
export default function ConfirmEmail() {
  const location = useLocation();
  const navigate = useNavigate();

  const [ApiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(false);

  const email = location.state?.email;
  const password = location.state?.password;

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const onSubmit = async ({ otp }) => {
    try {
      setLoading(true);
      setApiError(null);

      await verifyOTP({
        email,
        otp,
      });

      const res = await login({
        email,
        password,
      });

      if (res?.result?.access_token) {
        navigate("/dashboard");
      }
    } catch (error) {
      setApiError(error.response?.data?.error || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      await resendOTP(email);
      toast.success("OTP sent again");
    } catch (error) {
      setApiError(error.response?.data?.error || "Failed to resend OTP");
    }
  };

  return (
    <section className="flex justify-center relative items-center min-h-screen bg-[#070a10]">
      <div
        className="pointer-events-none absolute top-1/4 left-1/4 h-64 w-64 rounded-full
         bg-[radial-gradient(circle,rgb(0,27,136)_0%,transparent_70%)] blur-2xl"
      />

      <div
        className="pointer-events-none absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full
         bg-[radial-gradient(circle,rgb(0,27,136)_0%,transparent_70%)] blur-3xl"
      />
      <div className="w-full max-w-md p-8 bg-white/5 border border-white/10 rounded-xl">
        {ApiError && <Alert color="danger" title={ApiError} />}

        <Form onSubmit={handleSubmit(onSubmit)}>
          {/* <Input {...register("otp")} label="OTP" placeholder="Enter code" /> */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-sky-200">OTP Code</label>

            <InputOtp
              color="primary"
              variant="bordered"
              length={6}
              onValueChange={(val) => setValue("otp", val)}
              classNames={{
                segment: "bg-white/5 border border-white/10 text-white",
              }}
            />
          </div>
          <ValidationError error={errors.otp?.message} />

          <Button
            type="submit"
            variant="shadow"
            color="primary"
            isLoading={loading}
          >
            Verify
          </Button>
        </Form>

        <Button
          onClick={handleResend}
          className="mt-5"
          variant="ghost"
          color="primary"
        >
          Resend OTP
        </Button>
      </div>
    </section>
  );
}
