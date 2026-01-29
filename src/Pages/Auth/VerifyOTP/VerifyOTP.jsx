import { Button, Form, Input } from "@heroui/react";
import ValidationError from "../../../Components/Shared/ValidationError/ValidationError";

export default function VerifyOTP({ onSubmit, register, errors }) {
  return (
    <Form className="mt-6 flex flex-col gap-4" onSubmit={onSubmit}>
      <Input
        {...register("otp")}
        label="OTP"
        labelPlacement="outside"
        placeholder="Enter 6-digit code"
        variant="faded"
        classNames={{
          inputWrapper: "bg-white/5 border border-white/10 text-white",
        }}
      />
      <ValidationError error={errors.otp?.message} />

      <Button
        type="submit"
        className="mt-4 bg-green-600/80 hover:bg-green-600 text-white"
      >
        Verify OTP
      </Button>
    </Form>
  );
}
