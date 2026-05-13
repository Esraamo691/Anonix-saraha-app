import AppButton from "../../../Components/Shared/AppButton/AppButton";
import { useNavigate, Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { login, googleLogin } from "../../../services/AuthServices";
import { Alert, Form, Input } from "@heroui/react";
import ValidationError from "../../../Components/Shared/ValidationError/ValidationError";
import { GoogleLogin } from "@react-oauth/google";
import * as z from "zod";

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

export default function Login() {
  const navigate = useNavigate();
  const { setToken } = useContext(AuthContext);

  const [ApiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors, isValid },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  // Normal Login
  const onLogin = async (data) => {
    try {
      setLoading(true);
      setApiError(null);

      const response = await login(data);

      const tokenFromServer = response?.result?.access_token;

      if (tokenFromServer) {
        setToken(tokenFromServer);
        navigate("/dashboard");
      } else {
        setApiError("Token not returned from server");
      }
    } catch (error) {
      setApiError(
        error.response?.data?.error_message ||
          error.response?.data?.message ||
          "Something went wrong",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setLoading(true);
      setApiError(null);

      const response = await googleLogin(credentialResponse.credential);

      const tokenFromServer = response?.result?.account?.access_token;

      if (tokenFromServer) {
        localStorage.setItem("access_token", tokenFromServer);
        localStorage.setItem(
          "refresh_token",
          response?.result?.account?.refresh_token,
        );

        localStorage.setItem("access_token", tokenFromServer);
        setToken(tokenFromServer);
        navigate("/dashboard");
      } else {
        setApiError("Google token not returned from server");
      }
    } catch (error) {
      setApiError(
        error.response?.data?.error_message ||
          error.response?.data?.message ||
          "Google login failed",
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="relative bg-[#070a10] min-h-screen flex justify-center items-center overflow-hidden px-4">
      {/* Background Effects */}
      <div
        className="pointer-events-none absolute top-1/4 left-1/4 h-64 w-64 rounded-full
        bg-[radial-gradient(circle,rgb(0,27,136)_0%,transparent_70%)] blur-2xl"
      />

      <div
        className="pointer-events-none absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full
        bg-[radial-gradient(circle,rgb(0,27,136)_0%,transparent_70%)] blur-3xl"
      />

      {/* Card */}
      <div className="relative z-10 w-full max-w-md rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-xl">
        <h1 className="logo-gradient text-center text-3xl font-bold">
          Welcome To Anonix
        </h1>

        <p className="mt-2 text-center text-sm text-gray-400">
          Log in to read your anonymous messages.
        </p>

        {/* Error */}
        {ApiError && (
          <div className="flex mt-4 items-center justify-center w-full">
            <Alert
              variant="faded"
              color="danger"
              className="py-2"
              title={ApiError}
            />
          </div>
        )}

        {/* Login Form */}
        <Form
          className="mt-6 flex flex-col gap-4"
          onSubmit={handleLoginSubmit(onLogin)}
        >
          {/* Email */}
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

          {/* Password */}
          <div className="w-full">
            <Input
              {...loginRegister("password")}
              label="Password"
              labelPlacement="outside"
              placeholder="Enter your password"
              type="password"
              variant="faded"
              classNames={{
                inputWrapper: "bg-white/5 border border-white/10 text-white",
              }}
            />

            <ValidationError error={loginErrors.password?.message} />
          </div>

          {/* Forget Password */}
          <div className="flex justify-end w-full">
            <Link
              className="text-sm text-sky-200 hover:underline"
              to="/forget-password"
            >
              Forget Password
            </Link>
          </div>

          {/* Login Button */}
          <div className="flex items-end justify-between w-full">
            <AppButton
              type="submit"
              disabled={!isValid || loading}
              isLoading={loading}
            >
              Login
            </AppButton>
          </div>
        </Form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-xs text-gray-500">or</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* Google Login */}
        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => setApiError("Google login failed")}
            theme="outline"
            size="large"
            shape="pill"
            text="continue_with"
            width="100%"
          />
        </div>
      </div>
    </section>
  );
}
