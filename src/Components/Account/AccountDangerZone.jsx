// import { Card, Button, Input, Spinner } from "@heroui/react";
// import axios from "axios";
// import { useState } from "react";
// import { FaTrashAlt, FaExclamationTriangle } from "react-icons/fa";
// import { useMutation } from "@tanstack/react-query";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// export default function AccountDangerZone() {
//   return (
//     <Card className="relative overflow-hidden bg-red-500/5 backdrop-blur-xl border border-red-500/20 rounded-2xl p-6 shadow-[0_0_45px_rgba(255,0,0,0.2)]">
//       <div className="absolute -top-24 right-0 w-72 h-72 bg-red-600/30 rounded-full blur-3xl" />

//       <div className="relative space-y-5">
//         <div className="flex items-center gap-2 text-red-500">
//           <FaExclamationTriangle />
//           <h2 className="text-lg font-semibold">Danger Zone</h2>
//         </div>

//         <p className="text-sm text-gray-400">
//           This action is irreversible. Please type the phrase below to confirm.
//         </p>

//         <Input
//           value={confirmText}
//           onChange={(e) => setConfirmText(e.target.value)}
//           placeholder="delete my account"
//         />

//         <Button color="danger">
//           {isPending ? <Spinner size="sm" /> : <FaTrashAlt />}
//           Delete Account
//         </Button>
//       </div>
//     </Card>
//   );
// }
import { Card, Button, Input, Spinner } from "@heroui/react";
import { useState } from "react";
import { FaTrashAlt, FaExclamationTriangle } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { freezeAccount } from "../../services/profileServices";

export default function AccountDangerZone() {
  const [confirmText, setConfirmText] = useState("");
  const navigate = useNavigate();

  // logout function
  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };

  // mutation
  const { mutate, isPending } = useMutation({
    mutationFn: freezeAccount,
    onSuccess: () => {
      toast.success("Account frozen successfully ❄️");
      logout();
    },
    onError: (error) => {
      const message = error?.response?.data?.error;

      if (message === "Account Freezed") {
        toast.info("Account already frozen");
        logout();
        return;
      }

      toast.error("Something went wrong");
    },
  });

  return (
    <Card className="relative overflow-hidden bg-red-500/5 backdrop-blur-xl border border-red-500/20 rounded-2xl p-6 shadow-[0_0_45px_rgba(255,0,0,0.2)]">
      <div className="absolute -top-24 right-0 w-72 h-72 bg-red-600/30 rounded-full blur-3xl" />

      <div className="relative space-y-5">
        <div className="flex items-center gap-2 text-red-500">
          <FaExclamationTriangle />
          <h2 className="text-lg font-semibold">Danger Zone</h2>
        </div>

        <p className="text-sm text-gray-400">
          This action will freeze your account. Type the phrase below to
          confirm.
        </p>

        <Input
          value={confirmText}
          onChange={(e) => setConfirmText(e.target.value)}
          placeholder="freeze my account"
        />

        <Button
          color="danger"
          onClick={() => mutate()}
          isDisabled={confirmText !== "freeze my account" || isPending}
        >
          {isPending ? <Spinner size="sm" /> : <FaTrashAlt />}
          Freeze Account
        </Button>
      </div>
    </Card>
  );
}
