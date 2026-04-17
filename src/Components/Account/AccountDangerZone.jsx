import { Card, Button, Input, Spinner } from "@heroui/react";
import axios from "axios";
import { useState } from "react";
import { FaTrashAlt, FaExclamationTriangle } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function AccountDangerZone() {
  const [confirmText, setConfirmText] = useState("");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  const { mutate: confirmDelete, isPending } = useMutation({
    mutationFn: deleteAccount,
    onSuccess: () => {
      toast.success("Account Freezed successfully", { theme: "dark" });
      logout();
    },
    onError: (error) => {
      const message = error?.response?.data?.error;

      if (message === "Account Freezed") {
        toast.info("Your account is already frozen", { theme: "dark" });
        logout();
        return;
      }

      toast.error("Something went wrong", { theme: "dark" });
    },
  });

  async function deleteAccount() {
    return axios.delete("http://sarahne.eu-4.evennode.com/user/freez-account", {
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  }

  return (
    <Card className="relative overflow-hidden bg-red-500/5 backdrop-blur-xl border border-red-500/20 rounded-2xl p-6 shadow-[0_0_45px_rgba(255,0,0,0.2)]">
      <div className="absolute -top-24 right-0 w-72 h-72 bg-red-600/30 rounded-full blur-3xl" />

      <div className="relative space-y-5">
        <div className="flex items-center gap-2 text-red-500">
          <FaExclamationTriangle />
          <h2 className="text-lg font-semibold">Danger Zone</h2>
        </div>

        <p className="text-sm text-gray-400">
          This action is irreversible. Please type the phrase below to confirm.
        </p>

        <Input
          value={confirmText}
          onChange={(e) => setConfirmText(e.target.value)}
          placeholder="delete my account"
        />

        <Button
          color="danger"
          onClick={confirmDelete}
          isDisabled={confirmText !== "delete my account" || isPending}
        >
          {isPending ? <Spinner size="sm" /> : <FaTrashAlt />}
          Delete Account
        </Button>
      </div>
    </Card>
  );
}
