// import AppButton from "../../../Components/Shared/AppButton/AppButton";
// import { useNavigate } from "react-router-dom";
// import { useContext, useState } from "react";
// import { AuthContext } from "../../../Context/AuthContext";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { login } from "../../../services/AuthServices";
// import { Alert, Button, Form, Input } from "@heroui/react";
// import { Link } from "react-router-dom";
// import ValidationError from "../../../Components/Shared/ValidationError/ValidationError";
// import { useGoogleLogin } from "@react-oauth/google";
// import { googleLogin } from "../../../services/AuthServices";
// import * as z from "zod";
// // // Login Schema
// const loginSchema = z.object({
//   email: z.string().email("Invalid Email Address"),
//   password: z
//     .string()
//     .min(8, { message: "Password must be at least 8 characters long" })
//     .regex(
//       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#])[A-Za-z\d@$!%*?&^#]{8,}$/,
//       {
//         message:
//           "Password must contain at least one Uppercase letter, one LowerCase letter, one number, and one special character",
//       },
//     ),
// });
// export default function Login() {
//   const navigate = useNavigate();
//   const [ApiError, setApiError] = useState(null);
//   const { setToken } = useContext(AuthContext);
//   const [loading, setLoading] = useState(false);

//   const handleGoogleLogin = useGoogleLogin({
//     onSuccess: async (tokenResponse) => {
//       try {
//         setLoading(true);
//         const response = await googleLogin(tokenResponse.access_token);
//         const tokenFromServer = response?.result?.access_token;
//         if (tokenFromServer) {
//           setToken(tokenFromServer);
//           navigate("/dashboard");
//         }
//       } catch (error) {
//         setApiError(error.response?.data?.error || "Google login failed");
//       } finally {
//         setLoading(false);
//       }
//     },
//     onError: () => setApiError("Google login failed"),
//   });
//   // Login Form
//   const {
//     register: loginRegister,
//     handleSubmit: handleLoginSubmit,
//     formState: { errors: loginErrors, isSubmitting, isValid },
//   } = useForm({ resolver: zodResolver(loginSchema) });
//   const onLogin = async (data) => {
//     try {
//       setLoading(true);
//       setApiError(null);

//       const response = await login(data);

//       const tokenFromServer = response?.result?.access_token;

//       if (tokenFromServer) {
//         setToken(tokenFromServer);
//         navigate("/dashboard");
//       } else {
//         setApiError("Token not returned from server");
//       }
//     } catch (error) {
//       const errMsg = error.response?.data?.error;
//       setApiError(errMsg || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };
//   // const onLogin = async (data) => {
//   //   try {
//   //     setApiError(null);

//   //     const response = await login(data);

//   //     const tokenFromServer = response?.result?.access_token;

//   //     if (tokenFromServer) {
//   //       setToken(tokenFromServer);
//   //       navigate("/dashboard");
//   //     } else {
//   //       setApiError("Token not returned from server");
//   //     }
//   //   } catch (error) {
//   //     const errMsg = error.response?.data?.error;

//   //     setApiError(errMsg || "Something went wrong");
//   //   }
//   // };
//   return (
//     <section className="relative bg-[#070a10] min-h-screen flex justify-center items-center overflow-hidden">
//       <div
//         className="pointer-events-none absolute top-1/4 left-1/4 h-64 w-64 rounded-full
//          bg-[radial-gradient(circle,rgb(0,27,136)_0%,transparent_70%)] blur-2xl"
//       />

//       <div
//         className="pointer-events-none absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full
//          bg-[radial-gradient(circle,rgb(0,27,136)_0%,transparent_70%)] blur-3xl"
//       />

//       <div className="relative z-10 w-full max-w-md rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-xl">
//         <h1 className="logo-gradient text-center">Welcome To Anonix</h1>
//         <p className="mt-2 text-center text-sm text-gray-400">
//           Log in to read your anonymous messages.
//         </p>

//         {ApiError && (
//           <div className="flex mt-3 items-center justify-center w-full">
//             <div className="flex flex-col w-full">
//               <div className="w-full flex items-center my-3">
//                 <Alert
//                   variant="faded"
//                   color="danger"
//                   className="py-2"
//                   title={ApiError}
//                 />
//               </div>
//             </div>
//           </div>
//         )}

//         <Form
//           className="mt-6 flex flex-col gap-4"
//           onSubmit={handleLoginSubmit(onLogin)}
//         >
//           <div className="w-full">
//             <Input
//               {...loginRegister("email")}
//               label="Email"
//               labelPlacement="outside"
//               placeholder="Enter your email"
//               type="email"
//               variant="faded"
//               classNames={{
//                 inputWrapper: "bg-white/5 border border-white/10 text-white",
//               }}
//             />
//             <ValidationError error={loginErrors.email?.message} />
//           </div>

//           <div className="w-full">
//             <Input
//               {...loginRegister("password")}
//               label="Password"
//               labelPlacement="outside"
//               placeholder="Enter your password"
//               type="password"
//               variant="faded"
//               classNames={{
//                 inputWrapper: "bg-white/5 border border-white/10 text-white",
//               }}
//             />
//             <ValidationError error={loginErrors.password?.message} />
//           </div>
//           <div className="flex justify-end w-full">
//             <Link
//               className="text-sm text-sky-200 hover:underline"
//               to={"/forget-password"}
//             >
//               Forget Password
//             </Link>
//           </div>
//           <div className="flex items-end justify-between w-full">
//             <AppButton
//               type="submit"
//               disabled={!isValid || loading}
//               isLoading={loading}
//             >
//               Login
//             </AppButton>
//           </div>
//         </Form>
//         {/* Divider */}
//         <div className="flex items-center gap-3 my-2">
//           <div className="flex-1 h-px bg-white/10" />
//           <span className="text-xs text-gray-500">or</span>
//           <div className="flex-1 h-px bg-white/10" />
//         </div>

//         {/* Google Button */}
//         <button
//           type="button"
//           onClick={() => handleGoogleLogin()}
//           disabled={loading}
//           className="w-full flex items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-200 py-2.5 px-4 text-sm text-white font-medium"
//         >
//           <svg width="18" height="18" viewBox="0 0 24 24">
//             <path
//               fill="#4285F4"
//               d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
//             />
//             <path
//               fill="#34A853"
//               d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
//             />
//             <path
//               fill="#FBBC05"
//               d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
//             />
//             <path
//               fill="#EA4335"
//               d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
//             />
//           </svg>
//           Continue with Google
//         </button>
//       </div>
//     </section>
//   );
// }
// import AppButton from "../../../Components/Shared/AppButton/AppButton";
// import { useNavigate } from "react-router-dom";
// import { useContext, useState } from "react";
// import { AuthContext } from "../../../Context/AuthContext";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { login } from "../../../services/AuthServices";
// import { Alert, Form, Input } from "@heroui/react";
// import { Link } from "react-router-dom";
// import ValidationError from "../../../Components/Shared/ValidationError/ValidationError";
// // import { useGoogleLogin } from "@react-oauth/google";
// import { GoogleLogin } from "@react-oauth/google";
// import { googleLogin } from "../../../services/AuthServices";
// import * as z from "zod";

// const loginSchema = z.object({
//   email: z.string().email("Invalid Email Address"),
//   password: z
//     .string()
//     .min(8, { message: "Password must be at least 8 characters long" })
//     .regex(
//       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#])[A-Za-z\d@$!%*?&^#]{8,}$/,
//       {
//         message:
//           "Password must contain at least one Uppercase letter, one LowerCase letter, one number, and one special character",
//       },
//     ),
// });

// export default function Login() {
//   const navigate = useNavigate();
//   const [ApiError, setApiError] = useState(null);
//   const { setToken } = useContext(AuthContext);
//   const [loading, setLoading] = useState(false);

//   const handleGoogleLogin = useGoogleLogin({
//     onSuccess: async (tokenResponse) => {
//       console.log("tokenResponse:", tokenResponse);
//       try {
//         setLoading(true);
//         const response = await googleLogin(tokenResponse.access_token);
//         const tokenFromServer = response?.result?.access_token;
//         if (tokenFromServer) {
//           setToken(tokenFromServer);
//           navigate("/dashboard");
//         }
//       } catch (error) {
//         setApiError(error.response?.data?.error || "Google login failed");
//       } finally {
//         setLoading(false);
//       }
//     },
//     onError: () => setApiError("Google login failed"),
//   });

//   const {
//     register: loginRegister,
//     handleSubmit: handleLoginSubmit,
//     formState: { errors: loginErrors, isValid },
//   } = useForm({ resolver: zodResolver(loginSchema) });

//   const onLogin = async (data) => {
//     try {
//       setLoading(true);
//       setApiError(null);
//       const response = await login(data);
//       const tokenFromServer = response?.result?.access_token;
//       if (tokenFromServer) {
//         setToken(tokenFromServer);
//         navigate("/dashboard");
//       } else {
//         setApiError("Token not returned from server");
//       }
//     } catch (error) {
//       const errMsg = error.response?.data?.error;
//       setApiError(errMsg || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <section className="relative bg-[#070a10] min-h-screen flex justify-center items-center overflow-hidden">
//       <div
//         className="pointer-events-none absolute top-1/4 left-1/4 h-64 w-64 rounded-full
//          bg-[radial-gradient(circle,rgb(0,27,136)_0%,transparent_70%)] blur-2xl"
//       />
//       <div
//         className="pointer-events-none absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full
//          bg-[radial-gradient(circle,rgb(0,27,136)_0%,transparent_70%)] blur-3xl"
//       />
//       <div className="relative z-10 w-full max-w-md rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-xl">
//         <h1 className="logo-gradient text-center">Welcome To Anonix</h1>
//         <p className="mt-2 text-center text-sm text-gray-400">
//           Log in to read your anonymous messages.
//         </p>

//         {ApiError && (
//           <div className="flex mt-3 items-center justify-center w-full">
//             <div className="flex flex-col w-full">
//               <div className="w-full flex items-center my-3">
//                 <Alert
//                   variant="faded"
//                   color="danger"
//                   className="py-2"
//                   title={ApiError}
//                 />
//               </div>
//             </div>
//           </div>
//         )}

//         <Form
//           className="mt-6 flex flex-col gap-4"
//           onSubmit={handleLoginSubmit(onLogin)}
//         >
//           <div className="w-full">
//             <Input
//               {...loginRegister("email")}
//               label="Email"
//               labelPlacement="outside"
//               placeholder="Enter your email"
//               type="email"
//               variant="faded"
//               classNames={{
//                 inputWrapper: "bg-white/5 border border-white/10 text-white",
//               }}
//             />
//             <ValidationError error={loginErrors.email?.message} />
//           </div>

//           <div className="w-full">
//             <Input
//               {...loginRegister("password")}
//               label="Password"
//               labelPlacement="outside"
//               placeholder="Enter your password"
//               type="password"
//               variant="faded"
//               classNames={{
//                 inputWrapper: "bg-white/5 border border-white/10 text-white",
//               }}
//             />
//             <ValidationError error={loginErrors.password?.message} />
//           </div>

//           <div className="flex justify-end w-full">
//             <Link
//               className="text-sm text-sky-200 hover:underline"
//               to={"/forget-password"}
//             >
//               Forget Password
//             </Link>
//           </div>

//           <div className="flex items-end justify-between w-full">
//             <AppButton
//               type="submit"
//               disabled={!isValid || loading}
//               isLoading={loading}
//             >
//               Login
//             </AppButton>
//           </div>
//         </Form>

//         <div className="flex items-center gap-3 my-2">
//           <div className="flex-1 h-px bg-white/10" />
//           <span className="text-xs text-gray-500">or</span>
//           <div className="flex-1 h-px bg-white/10" />
//         </div>
//         <GoogleLogin
//           onSuccess={async (credentialResponse) => {
//             try {
//               setLoading(true);

//               console.log(credentialResponse);

//               const response = await googleLogin(credentialResponse.credential);

//               const tokenFromServer = response?.result?.access_token;

//               if (tokenFromServer) {
//                 setToken(tokenFromServer);
//                 navigate("/dashboard");
//               }
//             } catch (error) {
//               setApiError(
//                 error.response?.data?.error_message || "Google login failed",
//               );
//             } finally {
//               setLoading(false);
//             }
//           }}
//           onError={() => {
//             setApiError("Google login failed");
//           }}
//         />
//         {/* <button
//           type="button"
//           onClick={() => handleGoogleLogin()}
//           disabled={loading}
//           className="w-full flex items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-200 py-2.5 px-4 text-sm text-white font-medium"
//         >
//           <svg width="18" height="18" viewBox="0 0 24 24">
//             <path
//               fill="#4285F4"
//               d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
//             />
//             <path
//               fill="#34A853"
//               d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
//             />
//             <path
//               fill="#FBBC05"
//               d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
//             />
//             <path
//               fill="#EA4335"
//               d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
//             />
//           </svg>
//           Continue with Google
//         </button> */}
//       </div>
//     </section>
//   );
// }

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

  // Google Login
  // const handleGoogleSuccess = async (credentialResponse) => {
  //   try {
  //     setLoading(true);
  //     setApiError(null);

  //     console.log("Google Response:", credentialResponse);

  //     // credential === idToken
  //     const response = await googleLogin(credentialResponse.credential);

  //     const tokenFromServer = response?.result?.account?.access_token;
  //     if (tokenFromServer) {
  //       setToken(tokenFromServer);
  //       navigate("/dashboard");
  //     } else {
  //       setApiError("Google token not returned from server");
  //     }
  //   } catch (error) {
  //     console.log(error);

  //     setApiError(
  //       error.response?.data?.error_message ||
  //         error.response?.data?.message ||
  //         "Google login failed",
  //     );
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setLoading(true);
      setApiError(null);

      const response = await googleLogin(credentialResponse.credential);

      // الـ googleLogin بيحفظ في localStorage تلقائياً
      // بس نتأكد من الـ token
      const tokenFromServer = response?.result?.account?.access_token;

      if (tokenFromServer) {
        // ✅ احفظ في localStorage صراحةً قبل setToken
        localStorage.setItem("access_token", tokenFromServer);
        localStorage.setItem(
          "refresh_token",
          response?.result?.account?.refresh_token,
        );

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
            onError={() => {
              setApiError("Google login failed");
            }}
          />
        </div>
      </div>
    </section>
  );
}
