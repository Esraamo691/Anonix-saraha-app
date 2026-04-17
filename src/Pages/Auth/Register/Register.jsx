// import React, { useState } from "react";
// import { Alert, Button, Form, Input } from "@heroui/react";
// import { Select, SelectItem } from "@heroui/react";
// import { useForm, Controller } from "react-hook-form";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import * as z from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import ValidationError from "../../../Components/Shared/ValidationError/ValidationError";
// import AppButton from "../../../Components/Shared/AppButton/AppButton";
// // import GoogleSignUp from "../GoogleSignUp/GoogleSignUp";
// import { API_BASE_URL } from "../../../services/api";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { registerServices } from "../../../services/AuthServices";
import ValidationError from "../../../Components/Shared/ValidationError/ValidationError";
import { Alert, Button, Form, Input } from "@heroui/react";
import { Select, SelectItem } from "@heroui/react";
import AppButton from "../../../Components/Shared/AppButton/AppButton";
// const defaultValues = {
//   firstName: "",
//   lastName: "",
//   email: "",
//   password: "",
//   gender: "",
//   phone: "",
// };
const defaultValues = {
  userName: "",
  email: "",
  password: "",
  confirmPassword: "",
  gender: "",
  phone: "",
};
// const schema = z.object({
//   firstName: z
//     .string()
//     .min(3, { message: "FirstName must be at least 3 characters long" }),

//   lastName: z
//     .string()
//     .min(3, { message: "LastName must be at least 3 characters long" }),

//   email: z.string().email("Invalid Email Address"),

//   password: z
//     .string()
//     .min(8, { message: "Password must be at least 8 characters long" })
//     .regex(
//       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#])[A-Za-z\d@$!%*?&^#]{8,}$/,
//       {
//         message:
//           "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
//       },
//     ),

//   phone: z.string().regex(/^(?:\+20|0020|0)?1[0125][0-9]{8}$/, {
//     message: "Please enter a valid Egyptian phone number",
//   }),

//   gender: z.enum(["male", "female"], {
//     message: "Please select a gender",
//   }),
// });
const schema = z
  .object({
    userName: z.string().min(3),

    email: z.string().email(),

    password: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,25}$/,
        "Password does not match backend requirements",
      ),

    confirmPassword: z.string(),

    phone: z.string(),

    gender: z.enum(["0", "1"]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
export default function Register() {
  const navigate = useNavigate();
  const [ApiError, setApiError] = useState(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    defaultValues,
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  // const onSubmit = async (data) => {
  //   try {
  //     setApiError(null);

  //     const response = await registerServices(data);

  //     if (
  //       response?.message ===
  //       "User Created Successfully, Please Check Your Email"
  //     ) {
  //       navigate("/confirm-email", {
  //         state: {
  //           email: data.email,
  //           password: data.password,
  //         },
  //       });
  //     } else {
  //       setApiError(response?.error || "Registration failed");
  //     }
  //   } catch (error) {
  //     setApiError(error.response?.data?.error || "Something went wrong");
  //   }
  // };
  const onSubmit = async (data) => {
    try {
      setApiError(null);

      const payload = {
        userName: data.userName,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
        phone: data.phone,
        gender: Number(data.gender),
      };

      const response = await registerServices(payload);

      if (response?.status === 201) {
        navigate("/confirm-email", {
          state: {
            email: data.email,
            password: data.password,
          },
        });
      } else {
        setApiError(response?.error_message || "Registration failed");
      }
    } catch (error) {
      setApiError(
        error?.response?.data?.error_message || "Something went wrong",
      );
    }
  };
  return (
    <section className="relative bg-[#070a10] py-10 min-h-screen flex justify-center items-center overflow-hidden">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-105 w-105 
        -translate-x-1/2 -translate-y-1/2 rounded-full 
        bg-[radial-gradient(circle,rgb(0,27,136)_0%,transparent_70%)] blur-2xl"
      />
      <div className="relative z-10 w-full max-w-md rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-xl">
        <h1 className="logo-gradient text-center">Welcome To Anonix</h1>

        <p className="mt-2 text-center text-sm text-gray-400">
          Receive honest messages, anonymous feedback.
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
        <Form
          className="mt-6 flex flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* First Name */}
          {/* <div className="w-full">
            <Input
              {...register("firstName")}
              label="FirstName"
              labelPlacement="outside"
              placeholder="Enter a FirstName"
              variant="faded"
              classNames={{
                inputWrapper: "bg-white/5 border border-white/10 text-white",
              }}
            />
            <ValidationError error={errors.firstName?.message} />
          </div> */}

          {/* Last Name */}
          {/* <div className="w-full">
            <Input
              {...register("lastName")}
              label="LastName"
              labelPlacement="outside"
              placeholder="Enter a LastName"
              variant="faded"
              classNames={{
                inputWrapper: "bg-white/5 border border-white/10 text-white",
              }}
            />
            <ValidationError error={errors.lastName?.message} />
          </div> */}

          {/* username */}

          <div className="w-full">
            <Input
              {...register("userName")}
              label="User Name"
              labelPlacement="outside"
              placeholder="Enter username"
              variant="faded"
              classNames={{
                inputWrapper: "bg-white/5 border border-white/10 text-white",
              }}
            />
            <ValidationError error={errors.userName?.message} />
          </div>

          {/* Email */}
          <div className="w-full">
            <Input
              {...register("email")}
              label="Email"
              labelPlacement="outside"
              placeholder="Enter your email"
              type="email"
              variant="faded"
              classNames={{
                inputWrapper: "bg-white/5 border border-white/10 text-white",
              }}
            />
            <ValidationError error={errors.email?.message} />
          </div>

          {/* Password */}
          <div className="w-full">
            <Input
              {...register("password")}
              label="Password"
              labelPlacement="outside"
              placeholder="Enter your password"
              type="password"
              variant="faded"
              classNames={{
                inputWrapper: "bg-white/5 border border-white/10 text-white",
              }}
            />
            <ValidationError error={errors.password?.message} />
          </div>
          {/* confirm */}
          <div className="w-full">
            <Input
              {...register("confirmPassword")}
              label="confirmPassword"
              labelPlacement="outside"
              placeholder="Please confirm the password"
              type="password"
              variant="faded"
              classNames={{
                inputWrapper: "bg-white/5 border border-white/10 text-white",
              }}
            />
            <ValidationError error={errors.confirmPassword?.message} />
          </div>

          {/* Gender using Controller */}
          <div className="w-full">
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <Select
                  label="Select a gender"
                  selectedKeys={field.value ? [field.value] : []}
                  onSelectionChange={(keys) => field.onChange([...keys][0])}
                  classNames={{
                    trigger:
                      "bg-white/5 py-2 border border-white/10 text-white",
                    value: "text-white",
                    popoverContent: "bg-[#070a10] border border-white/10",
                  }}
                  variant="faded"
                >
                  <SelectItem key="0">Male</SelectItem>
                  <SelectItem key="1">Female</SelectItem>
                </Select>
              )}
            />
            <ValidationError error={errors.gender?.message} />
          </div>

          {/* Phone */}
          <div className="w-full">
            <Input
              {...register("phone")}
              label="Phone"
              labelPlacement="outside"
              placeholder="Enter your phone"
              type="tel"
              variant="faded"
              classNames={{
                inputWrapper: "bg-white/5 border border-white/10 text-white",
              }}
            />
            <ValidationError error={errors.phone?.message} />
          </div>
          <div className="flex items-end justify-between w-full ">
            <AppButton
              type="submit"
              disabled={!isValid}
              isLoading={isSubmitting}
            >
              Register
            </AppButton>
            {/* <GoogleSignUp /> */}
          </div>
        </Form>

        <p className="mt-4 text-center text-xs text-gray-500">
          By creating an account, you can receive anonymous messages, manage
          users, and interact with comments freely.
        </p>
      </div>
    </section>
  );
}
