import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function GoogleSignUp({ setApiError }) {
  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse) => {
    const idToken = credentialResponse.credential;

    try {
      const res = await axios.post(
        "http://sarahne.eu-4.evennode.com/auth/google-signup",
        { idToken },
      );

      if (res.data?.token || res.data?.message === "success") {
        navigate("/dashboard");
      }
    } catch (err) {
      const backendError = err.response?.data?.error;

      if (backendError === "User Already Exist") {
        setApiError(
          "This Google account already exists. Please login instead.",
        );
      } else {
        setApiError("Google signup failed. Please try again.");
      }
    }
  };

  const handleError = () => {
    setApiError(
      "Google authentication failed. This domain may not be allowed.",
    );
  };

  return (
    <div className="mt-6 flex justify-center">
      <div
        className="
          rounded-xl overflow-hidden
          border border-white/10
          bg-white/5
          backdrop-blur-sm
        "
      >
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={handleError}
          theme="filled_blue"
          size="large"
          shape="circle"
          width="100"
          text="continue_with"
        />
      </div>
    </div>
  );
}
