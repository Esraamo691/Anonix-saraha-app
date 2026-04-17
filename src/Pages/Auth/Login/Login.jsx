import AppButton from "../../../Components/Shared/AppButton/AppButton";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "../../../services/AuthServices";
import { Alert, Button, Form, Input } from "@heroui/react";
import { Link } from "react-router-dom";
import ValidationError from "../../../Components/Shared/ValidationError/ValidationError";
import * as z from "zod";
// // Login Schema
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
  const [ApiError, setApiError] = useState(null);
  const { setToken } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  // Login Form
  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors, isSubmitting, isValid },
  } = useForm({ resolver: zodResolver(loginSchema) });
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
      const errMsg = error.response?.data?.error;
      setApiError(errMsg || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  // const onLogin = async (data) => {
  //   try {
  //     setApiError(null);

  //     const response = await login(data);

  //     const tokenFromServer = response?.result?.access_token;

  //     if (tokenFromServer) {
  //       setToken(tokenFromServer);
  //       navigate("/dashboard");
  //     } else {
  //       setApiError("Token not returned from server");
  //     }
  //   } catch (error) {
  //     const errMsg = error.response?.data?.error;

  //     setApiError(errMsg || "Something went wrong");
  //   }
  // };
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
          Log in to read your anonymous messages.
        </p>

        {ApiError && (
          <div className="flex mt-3 items-center justify-center w-full">
            <div className="flex flex-col w-full">
              <div className="w-full flex items-center my-3">
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
              classNames={{
                inputWrapper: "bg-white/5 border border-white/10 text-white",
              }}
            />
            <ValidationError error={loginErrors.password?.message} />
          </div>
          <div className="flex justify-end w-full">
            <Link
              className="text-sm text-sky-200 hover:underline"
              to={"/forget-password"}
            >
              Forget Password
            </Link>
          </div>
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
      </div>
    </section>
  );
}
