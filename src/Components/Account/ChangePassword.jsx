import { Card, Input, Button } from "@heroui/react";
import { FaLock } from "react-icons/fa";
import { useState } from "react";
import { changePassword } from "../../services/profileServices";
import { toast } from "react-toastify";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (loading) return;

    try {
      setLoading(true);

      const payload = {
        oldPassword,
        password,
        confirmPassword,
      };

      await changePassword(payload);

      toast.success("Password updated successfully ");

      setOldPassword("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error(error);
      toast.error(
        error?.response?.data?.message ||
          error?.response?.data?.msg ||
          "Failed to update password",
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <Card className="relative overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-[0_0_45px_rgba(0,80,255,0.18)]">
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-blue-700/30 rounded-full blur-3xl" />

      <div className="relative space-y-6">
        <div className="flex items-center gap-2 text-white">
          <FaLock className="text-blue-500" />
          <h2 className="text-lg font-semibold">Change Password</h2>
        </div>

        <Input
          label="Current Password"
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />

        <Input
          label="New Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Input
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <Button color="primary" onPress={handleSubmit} isLoading={loading}>
          Update Password
        </Button>
      </div>
    </Card>
  );
};

export default ChangePassword;
